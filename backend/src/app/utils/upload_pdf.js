const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + file.originalname
        cb(null, filename)
    }
})

module.exports = multer({ 
    storage: storage,
    fileFilter: function (req, file, callback) {
        if(file.mimetype !== 'application/pdf') {
            return callback(new Error('Only PDF is allowed'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
}).single('file')