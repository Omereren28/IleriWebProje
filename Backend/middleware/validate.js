/**
 * HomeOfEmlak — Request Validation Middleware
 */
const { validationResult } = require('express-validator');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Doğrulama hatası',
      errors: errors.array().map(e => e.msg)
    });
  }
  next();
}

module.exports = validate;
