const jwt = require('jsonwebtoken');

exports.generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRETKEY, { expiresIn: '5d' });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRETKEY, { expiresIn: '14d' }); // Use a different secret key for refresh tokens

    return { accessToken, refreshToken };
};