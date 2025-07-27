const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
require('dotenv').config(); // Only needed if not already loaded in server.js

const storage = new Storage(); // Automatically uses GOOGLE_APPLICATION_CREDENTIALS
const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);

async function uploadFile(localFilePath, destinationFileName) {
  await bucket.upload(localFilePath, {
    destination: destinationFileName,
    resumable: false,
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });

  fs.unlinkSync(localFilePath); // Delete local file after upload
  console.log(`✅ Uploaded ${localFilePath} to GCS as ${destinationFileName}`);
}

module.exports = { uploadFile };
