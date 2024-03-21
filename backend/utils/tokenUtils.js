const jwt = require('jsonwebtoken');

exports.generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRETKEY, { expiresIn: '5d' });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRETKEY, { expiresIn: '14d' });

    return { accessToken, refreshToken };
};