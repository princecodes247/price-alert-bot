const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;

// // Function to replace spaces with hyphens and remove brackets from file names
// const sanitizeFileName = (originalname) => {
//   const sanitized = originalname
//     .replace(/\s+/g, "-") // Replace spaces with hyphens
//     .replace(/[{}[\]()]/g, ""); // Remove brackets
//   return sanitized;
// };

// // Set storage for uploaded files
// const pathToStorage = "tmp/";
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // cb(null, "tmp/"); // Specify the directory where you want to store the uploaded files
//     cb(null, pathToStorage); // Specify the directory where you want to store the uploaded files
//   },
//   filename: (req, file, cb) => {
//     const fileName = `${Date.now()}-${sanitizeFileName(file.originalname)}`;
//     cb(null, fileName);
//   },
// });

// // Configure multer with the storage
// const upload = multer({ storage });

// module.exports = upload;
