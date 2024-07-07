import multer from 'multer';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


const fileFilter = (req, file, cb) => {
    if (file.originalname.endsWith('.pdf')) {
        cb(null, true);
    } else {
        cb(new Error('No es un archivo PDF'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

export default upload;