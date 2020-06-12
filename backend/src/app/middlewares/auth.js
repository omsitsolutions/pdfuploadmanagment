const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const tokenHeader =  req.headers.authorization

    if(!tokenHeader){
        return res.status(401).json({ message: 'Permission denied'})
    }

    const token = tokenHeader.split('Bearer ')[1]
    console.log('token', token)

    await jwt.verify(token, process.env.APP_SECRET, function(err, decoded) {
        
        if (err) {
            return res.status(401).json({ message: 'Invalid Token'})
        } else {
            req.userId = decoded.id;
            next();
        }
    });
}