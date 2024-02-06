const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateTokens } = require('../utils/tokenUtils');

exports.register = async (req, res) => {
    try {
        const { username, email, rememberMe, password, dob } = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser) {
            res.status(401).json({
                "message": "User already exists. Login instead."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            dob,
        });

        await newUser.save();

        const { accessToken, refreshToken } = generateTokens(newUser._id);

        if (rememberMe) {
            res.cookie('refreshToken', refreshToken, {
                httpOnly: false,
                secure: true,
                sameSite: 'None',
                expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            });
        }

        res.cookie('token', accessToken, {
            httpOnly: false,
            secure: true,
            sameSite: 'None',
            expires: new Date(Date.now() + 10800000),
        });

        res.status(201).json({
            message: "User created successfully!",
            userId: newUser._id,
            token: accessToken,
            refreshToken: refreshToken,
        });
    }
    catch(error) {
        console.log(error);
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password, rememberMe } = req.body;

        const user = await User.findOne({username});
        if(!user) {
            res.status(401).json({
                "message": "User does not exist. Register instead."
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            res.status(401).json({
                "message": "Invalid username or password"
            });
        }

        const { accessToken, refreshToken } = generateTokens(user._id);

        if (rememberMe) {
            res.cookie('refreshToken', refreshToken, {
                httpOnly: false,
                secure: true,
                sameSite: 'None',
                expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            });
        }

        res.cookie('token', accessToken, {
            httpOnly: false,
            secure: true,
            sameSite: 'None',
            expires: new Date(Date.now() + 10800000),
        });

        res.status(201).json({
            message: "User logged in successfully",
            userId: user._id,
            token: accessToken,
            refreshToken: refreshToken,
        });
    }
    catch(error) {
        res.status(501).json({
            "message": "Internal Server Error",
            "Error: ": error
        });
    }
};

exports.users = async (req, res) => {
    try {
        const users = await User.find();

        const usersWithFormattedDOB = users.map(user => {
            const { _id, username, email, dob, password } = user;
            const formattedDOB = new Date(dob).toLocaleDateString('en-GB');
            return { _id, username, email, dob: formattedDOB, password };
        });
      
        res.status(200).json(usersWithFormattedDOB);
    } 
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(501).json({ error: 'Internal Server Error' });
    }
}

exports.logout = (req, res) => {
    res.clearCookie('token' && 'refreshToken');
}