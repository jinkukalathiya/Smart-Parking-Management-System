const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

module.exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log("Incoming request:", req.body);

    try {
        // ✅ Use findOne, not find
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log("User already exists:", email);
            return res.status(400).json({ message: 'User Already Exists...' });
        }

        const newUser = new User({ name, email, password, role });
        await newUser.save();
        console.log("User saved:", newUser);

        const token = generateToken(newUser);

        // res.status(201).json({
        //     token,
        //     user: {
        //         id: newUser._id,
        //         name: newUser.name,
        //         email: newUser.email,
        //         role: newUser.role,
        //     }
        // });
        res.status(201).json({message: 'Register Successfully..'})
        console.log("Register Successfully");
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ message: 'Server Error..' });
    }
};


module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: 'Invaid User...' });
        }

        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invaid Password...' });
        }

        const token = generateToken(user);
        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });

        console.log("Login Successfully");

    }catch(err){
        console.error("Login Error:", err);
        res.status(500).json({ message: 'Server Error..' });
    }
}