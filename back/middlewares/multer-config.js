// Import Multer
const multer = require('multer');

// To set extensions on images files
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

// Config Multer
const storage = multer.diskStorage({
    // To store images in images directory
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // to genreate a new file name
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Export Multer
module.exports = multer({storage}).single('image');