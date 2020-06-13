const { User } = require('../models')


class AuthController {

    async create(req, res) {

        const { name, email, password_req } = req.body

        try {
            const user = await User.create({
                name: name,
                email: email,
                password_req: password_req
            })
    
            if (!user) {
                return res.status(401).json({ message: 'User not found' })
            }
    
            return res.json({
                user: user.toJSON(),
                token: user.generateTokenUser()
            })

        } catch (error){
            console.log('error', error.message)
            return res.status(400).json({ message: error.message })
        }

    }

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