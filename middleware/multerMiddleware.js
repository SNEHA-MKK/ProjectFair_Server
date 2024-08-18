
const multer = require('multer')

//2)create storage space in server
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads') //where the file should be stored 
    },
    filename:(req,file,callback)=>{
        // Date.now() - return milliseconds from the date class
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename) // name by which the file should be stored 
    }
})

//3) providing file filter
const fileFilter = (req,file,callback)=>{
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error('Only png,jpg,jpeg files are accepted'))
    }
}

//call multer

const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig