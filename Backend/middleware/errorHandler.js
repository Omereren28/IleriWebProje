/**
 * HomeOfEmlak — Global Error Handler Middleware
 */
function errorHandler(err, req, res, next) {
  console.error('❌ Error:', err);

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Doğrulama hatası',
      errors: messages
    });
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors?.[0]?.path || 'alan';
    return res.status(409).json({
      success: false,
      message: `Bu ${field} zaten kullanılıyor`
    });
  }

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'Dosya boyutu çok büyük (max: 5MB)'
    });
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Geçersiz token'
    });
  }

  // Default
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Sunucu hatası',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = errorHandler;
