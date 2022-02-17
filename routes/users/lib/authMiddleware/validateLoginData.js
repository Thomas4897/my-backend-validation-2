const { isAlpha, isEmail, isAlphanumeric, isStrongPassword } = require('validator');

function validateLoginData(req, res, next) {
    let errObj = {};
    let body = req.body;
    const { username, password, email } = req.body;

    if (!isEmail(email)) {
        errObj.email = "Email should contain '@' and valid '.' address.";
    }

    // if (!isAlphanumeric(body.username)) {
    //     errObj.username = 'Username should only contain letters and numbers not contain special characters or spaces.';
    // }

    if (!isStrongPassword(password)) {
        errObj.password = "Password should contain 1 uppercase letter, 1 lowercase letter, 1 special character and 1 number.";
    }

    // Creates and array of Object keys;
    let checkObj = Object.keys(errObj);

    if (checkObj.length > 0) {
        return res.status(500).json({
            message: "Error",
            error: errObj
        });
    } else {
        next();
    }
}

module.exports = {
    validateLoginData,
}