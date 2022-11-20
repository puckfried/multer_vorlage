import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    console.log('Building file ',req.extension)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+ '.' + req.extension)
  }
})

const upload = multer({
    fileFilter: function(req, file, cb) {
        console.log('fliter runs', file)
        const [type, fileExtension] = file.mimetype.split('/')
        console.log(type, fileExtension)
        if (type !== 'image'){
            cb(new Error('Wrong data type'))
        }
        else {
            req.extension = fileExtension
            cb(null, true)
        }
    },
    storage: storage})

export default upload