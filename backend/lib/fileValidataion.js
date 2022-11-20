export function fileFilter(req, file, cb){
    console.log('fileFilter runs', req.file)
    const [type, fileExtension] = file.mimetype.split('/')
    if (type !== 'image'){
        cb(new Error('Wrong data type'))
    }
    else {
        req.extension = fileExtension
        cb(null, true)
    }
}