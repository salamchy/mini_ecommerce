import UserModel from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Controller for user registration
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate if all required fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if a user already exists with the provided email
    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password using bcrypt before saving it to the database
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = await UserModel.create({
      email,
      password: hashPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    return res.status(201).json({
      success: true,
      message: "Successfully Registered!!!",
      data: { email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Respond with a server error
  }
};

// Controller for user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    // Check if the user exists in the database
    const userExist = await UserModel.findOne({ email }).select("+password");

    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "User does not exist!!!",
      });
    }

    // Compare the provided password with the hashed password stored in the database
    const hash = bcrypt.compareSync(password, userExist.password);

    if (!hash) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      {
        id: userExist._id, // Use the existing user's ID
        email: userExist.email, // Include the email in the token
        role: userExist.role, // Include the role in the token
      },
      process.env.JWT_SECRET, // Secret key for signing the token
      { expiresIn: "1h" } // Token expiration time
    );

    //set the token as an HTTP-Only Cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, //development
      sameSite: "strict", //prevent from CSRF
      maxAge: 60 * 60 * 1000, //1hour
    });

    // Respond with a success message and the generated token
    return res.status(200).json({
      success: true,
      message: "Login Successfully!!!",
      token,
      user: {
        _id: userExist._id,
        email: userExist.email,
        role: userExist.role,
      },
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Respond with a server error
  }
};

//logout controller
export const logoutUser = (req, res) => {
  res.clearCookie("authToken");
  res.status(200).send({
    message: "Logged out successfully",
  });
};

// Get the logged-in user's data
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Fetch user data, excluding the password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Return the user data as JSON
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
