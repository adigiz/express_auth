const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

const { User } = require('../models')

const authentice = async (username, password, done) => {
    try {
        const user = await User.findOne({
            where: { username: username }
        })

        if (!user){
            return done(null, false, {
                message: "User or password is invalid"
            })
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return done(null, false, {
                message: "User or password is invalid"
            })
        }

        return done(null, user)
    } catch(err) {
        return done(null, false, {
            message: err.message
        })
    }
}

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, authentice));

passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    return done(null, user);
})

module.exports = passport;