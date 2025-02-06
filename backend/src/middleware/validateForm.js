import { body } from "express-validator";
import { validationResult } from "express-validator";

export const validateMessage = [
  body("name").not().isEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("message").not().isEmpty().withMessage("Message cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
