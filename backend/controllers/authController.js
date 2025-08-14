const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

module.exports.register = async(req, res) => {
    const { name, email, password, role} = req.body;
    console.log(req.body);
    try{
        let user = await User.find({email});
        if(user){
            res.status(400).json({message : 'User Already Exist...'});
        }
        user = new User({name, email, password, role});
        await user.save();

        const token = generateToken(user);
        res.status(201).json({token, user: {id: user._id, name: user.name, email: user.email, password: user.password} });
    }catch(err){
        res.status(500).json({message : 'Server Error..'});
    }
}
