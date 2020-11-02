const { Document } = require('../models')
const fs = require('fs')
const pdf = require('pdf-parse');
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

            try {
                const document = await Document.create({
                    id_user: req.userId,
                    doc_id: req.body.docId,
                    name: req.file.originalname,
                    size: req.file.size || null,
                    path: `/uploads/${req.file.filename}`
                })

                if (!document) {
                    return res.status(401).json({ message: 'The document could not be saved' })
                }

                return res.status(200).json({ message: 'Successfully created document' })

            } catch (error) {
                console.log('error', error.message)
                return res.status(400).json({ message: error.message })
            }
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

    async viewer(req, res) {

        const document = await Document.findOne({ where: { id: req.query.fileId, id_user: req.userId } })

        if (!document) {
            return res.status(401).json({ message: 'Preview not available' })
        }

        const path = `.${document.path}`

        try {
            if (fs.existsSync(path)) {
                return fs.readFile(path, function (err, data) {
                    const stat = fs.statSync(path);
                    res.setHeader('Content-Length', stat.size);
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
                    res.contentType("application/pdf");
                    res.send(data);
                });
            }

            return res.status(401).json({ message: 'Preview not available' })

        } catch (err) {
            return res.status(401).json({ message: 'Preview not available' })
        }
    }

    async details(req, res) {

        const document = await Document.findOne({ where: { id: req.query.fileId, id_user: req.userId } })

        if (!document) {
            return res.status(401).json({ message: 'Preview not available' })
        }

        const path = `.${document.path}`

        try {
            if (fs.existsSync(path)) {

                const buffer = fs.readFileSync(path);

                await pdf(buffer).then(function(data) {
                    return res.status(200).json(data)
                });
            }

            return res.status(401).json({ message: 'Preview not available' })

        } catch (err) {
            return res.status(401).json({ message: 'Preview not available' })
        }
    }

    async getDocumentsByDocID(req, res) {

        const documents = await Document.findAll({ where: { doc_id: req.docId } })

        if (!documents) {
            return res.status(401).json({ message: 'Documents not found' })
        }

        return res.json({
            documents: documents
        })

    }

    async deleteId(req, res) {
      try {

      console.log('Delete Controller Called In Server');

        await Document.destroy({ where: { id: req.query.fileId} }).then(deletedDoc => {
            res.json(deletedDoc);
          });

          const documents = await Document.findAll({ where: { id_user: req.userId } })

          if (!documents) {
              return res.status(401).json({ message: 'Documents not found' })
          }

          return res.json({
              documents: documents
          })


      } catch (err) {
          return res.status(401).json({ message: 'Preview not available' })
      }
    }
}

module.exports = new DocumentController()
