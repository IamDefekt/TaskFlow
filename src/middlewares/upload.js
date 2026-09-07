const multer = require("multer"); 
// const path = require("path"); 
 
// Configuration stockage 
const storage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
    cb(null, "src/uploads/"); 
  }, 
  filename: (req, file, cb) => { 
    const uniqueName = Date.now() + "-" + file.originalname; 
    cb(null, uniqueName); 
  }, 
}); 
 
// Filtrage type fichier 
const fileFilter = (req, file, cb) => { 
  const allowedTypes = [ "image/jpeg", "image/png", ]; 
 
  if (allowedTypes.includes(file.mimetype)) { 
    cb(null, true); 
  } 
  else { 
    cb(new Error("Type de fichier non autorisé"), false); 
  } 
}; 
 
const upload = multer({ 
  storage, 
  limits: {fileSize: 2 * 1024 * 1024 }, // 2MB 
  fileFilter, 
}); 
 
module.exports = upload; 