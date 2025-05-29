import express from 'express';
import multer from 'multer';
import { uploadCSV, getDistributedList } from '../controllers/uploadController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, upload.single('file'), uploadCSV);
router.get('/lists', auth, getDistributedList);

export default router;
