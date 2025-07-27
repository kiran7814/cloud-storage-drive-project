// cloud-drive-backend/routes/upload.routes.js
const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// GCP setup
const storage = new Storage({
  keyFilename: path.join(__dirname, '../config/gcp-key.json'),
});
const bucketName = process.env.GCP_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

// Upload route
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const gcpFileName = Date.now() + '-' + req.file.originalname;
    const blob = bucket.file(gcpFileName);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
      console.error('❌ GCP Upload Error:', err);
      return res.status(500).json({ message: 'Failed to upload to GCP', error: err.message });
    });

    blobStream.on('finish', () => {
      fs.unlinkSync(req.file.path); // Delete local file after upload
      return res.status(200).json({ message: '✅ Upload successful' });
    });

    // Pipe local file stream to GCP
    const fileStream = fs.createReadStream(req.file.path);
    fileStream.pipe(blobStream);
  } catch (error) {
    console.error('❌ Error during upload:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

module.exports = router;
