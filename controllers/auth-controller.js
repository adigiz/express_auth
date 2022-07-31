const bcrypt = require('bcrypt')
const passport = require('passport')
const uploadCloudinary = require('../lib/cloudinary')
const { User } = require('../models')

const registerPage = (req, res) => {
    return res.render('register')
}

const register = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if (password.length < 8) {
        return res.render('register', { error: "Password must be at least 8 chars"})
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);
    
    try {
        let user = {}
        user = await User.findOne({ where: { username: username }})
        if (user) {
            return res.render('register', { error: "User is already registered"})
        }

        const url = await uploadCloudinary(req.file.path)

        await User.create({
            username: username,
            password: encryptedPassword,
            avatar: url
        })
        return res.redirect('/login')
    } catch (err) {
        return res.render('register', { error: "Server is error"})
    }
}

const loginPage = (req, res) => {
    let messages = ""
    if(req.session) {
        if(req.session.messages){
            messages = "Not found";

            req.session.messages = []
        }
    }
    return res.render('login', { messages: messages })
}

const login = passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureMessage: true
})

const profile = (req, res) => {
    return res.render('profile', { user: req.user.dataValues })
}

module.exports = {
    registerPage,
    register,
    loginPage,
    login,
    profile
}