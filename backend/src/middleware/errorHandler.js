import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors
        .array()
        .map((err) => ({ field: err.param, message: err.msg })),
    });
  }
  next();
};
