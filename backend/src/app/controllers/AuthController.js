const { User } = require('../models')


class AuthController {

    async login(req, res) {

        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }

        const validPassword = await user.comparePassword(password)
        if (!validPassword) {
            return res.status(401).json({ message: 'Incorrect Password' })
        }

        return res.json({
            user: user.toJSON(),
            token: user.generateTokenUser()
        })
    }
}

module.exports = new AuthController()