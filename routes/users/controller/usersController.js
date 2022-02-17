const User = require('../model/User');
const bcrypt = require('bcryptjs');

// Middleware can be a Function;
// Happens between the request and the response;

const createUser = async (req, res) => {

    try {
        const { firstName, lastName, username, email, password } = req.body;

        // Validate User Info -> Moved to lib folder

        // Hashing/Encrypting Password;
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        // Creating a New User Object;
        let newUser = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword,
        });

        // Use .save() to save new user object to DB
        let savedUser = await newUser.save();

        res.status(200).json({
            message: "New user has been saved",
            payload: savedUser,
        });

    } catch (error) {
        let errorKey = Object.keys(error.keyValue);
        let errorValue = Object.values(error.keyValue);
    
        if (error.code === 11000) {
            res.status(500).json({
                message: "Error",
                error: `${errorKey} ${errorValue} is already in use`
            });
        } else {
            res.status(500).json({
                message: "Error",
                error: error.keyValue
            });
        }
    }

};

// Create user login function
const userLogin = async (req, res) => {

    try {

        const { email, password } = req.body;
        console.log(req.body);
        res.send('hello from login')
        
    } catch (error) {
        const { email, password } = req.body;
        console.log(req.body);
        res.send('hello from login')
    }
}

module.exports = {
    createUser,
    userLogin,
};