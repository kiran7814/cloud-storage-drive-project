const { Storage } = require('@google-cloud/storage');
require('dotenv').config();
const path = require('path');

async function testGCP() {
  try {
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: path.resolve(__dirname, './config/gcp-key.json'),
    });

    const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);
    const [files] = await bucket.getFiles();
    console.log('✅ Bucket connection successful. Files in bucket:');
    files.forEach(file => console.log(file.name));
  } catch (err) {
    console.error('❌ GCP connection error:', err.message);
  }
}

testGCP();
