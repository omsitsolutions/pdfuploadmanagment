const { Document } = require('../models')
const multer = require('multer')
const uploadPdf = require('../utils/upload_pdf')

class DocumentController {

    async store(req, res) {

        uploadPdf(req, res, async function (err) {
            
            if (err instanceof multer.MulterError) {
                return res.status(401).json({ message: err.message })
            } else if (err) {
                return res.status(401).json({ message: err.message })
            }

            const document = await Document.create({
                id_user: req.userId,
                size: req.file.size,
                path: `/uploads/${req.file.filename}`
            })
    
            if (!document) {
                return res.status(401).json({ message: 'the document could not be saved' })
            }
    
            return res.status(200).json({ message: 'Successfully created document' })
        })
    }

    async getDocumentsByUser(req, res) {

        const documents = await Document.findAll({ where: { id_user: req.userId } })

        if (!documents) {
            return res.status(401).json({ message: 'Documents not found' })
        }

        return res.json({
            documents: documents
        })

    }
}

module.exports = new DocumentController()