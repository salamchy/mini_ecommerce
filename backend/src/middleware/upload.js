import multer from "multer";

const storage = multer.memoryStorage(); // Store file in memory as a buffer
const upload = multer({ storage });

export default upload;
