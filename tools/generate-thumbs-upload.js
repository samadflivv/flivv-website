// tools/generate-thumbs-upload.js
// Usage: node generate-thumbs-upload.js
// npm i sharp glob @aws-sdk/client-s3 mime-types

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const sharp = require('sharp');
const mime = require('mime-types');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const sizes = [320, 640, 1024]; // thumbnail widths
const SOURCE_DIR = path.join(__dirname, 'source_images');
const OUT_DIR = path.join(__dirname, '..', 'ksaimages_resized'); // optional local output
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// AWS S3 config - set via env or edit below
const BUCKET = process.env.S3_BUCKET || 'flivv-web-cdn';
const PREFIX = process.env.S3_PREFIX || 'ksa-gallery'; // s3 prefix

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  endpoint: "https://flivv-web-cdn.s3.ap-south-1.amazonaws.com",
  forcePathStyle: true, // Required for Lightsail
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


async function uploadToS3(buffer, key, contentType) {
  console.log('📤 Uploading to S3:', key);
  await s3Client.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable'
  }));
  return `https://${BUCKET}.s3.amazonaws.com/${key}`;
}

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file, ext);
  const manifestEntry = { id: name, variants: {}, placeholder: null, original: null };

  // create placeholder (tiny, blurred) -> base64 data URI
  const placeholderBuffer = await sharp(file)
    .resize({ width: 20 })
    .blur(1)
    .jpeg({ quality: 75 })
    .webp({ quality: 70 })
    .toBuffer();
  const placeholder = `data:image/jpeg;base64,${placeholderBuffer.toString('base64')}`;
  manifestEntry.placeholder = placeholder;

  // upload original full-size (you can skip if already in S3)
  const originalBuffer = fs.readFileSync(file);
  const originalKey = `${PREFIX}/${name}/original${ext}`;
  const originalUrl = await uploadToS3(originalBuffer, originalKey, mime.lookup(ext) || 'image/jpeg');
  manifestEntry.original = originalUrl;

  // for each size, create JPG + WebP and upload, build srcset entries
  const jpgSrcset = [];
  const webpSrcset = [];

  for (const w of sizes) {
    const jpgBuf = await sharp(file).resize({ width: w }).jpeg({ quality: 75 }).toBuffer();
    const webpBuf = await sharp(file).resize({ width: w }).webp({ quality: 70 }).toBuffer();

    const jpgKey = `${PREFIX}/${name}/${name}-${w}.jpg`;
    const webpKey = `${PREFIX}/${name}/${name}-${w}.webp`;

    const jpgUrl = await uploadToS3(jpgBuf, jpgKey, 'image/jpeg');
    const webpUrl = await uploadToS3(webpBuf, webpKey, 'image/webp');

    jpgSrcset.push(`${jpgUrl} ${w}w`);
    webpSrcset.push(`${webpUrl} ${w}w`);

    // optionally write locally
    fs.writeFileSync(path.join(OUT_DIR, `${name}-${w}.jpg`), jpgBuf);
    fs.writeFileSync(path.join(OUT_DIR, `${name}-${w}.webp`), webpBuf);
  }

  manifestEntry.variants.jpg = jpgSrcset.join(', ');
  manifestEntry.variants.webp = webpSrcset.join(', ');
  // choose a 'low' fallback src (smallest)
  manifestEntry.low = manifestEntry.variants.jpg.split(',')[0].split(' ')[0];
  return manifestEntry;
}

(async () => {
  try {
    // Debug info
    console.log('SOURCE_DIR:', SOURCE_DIR);
    const dirExists = fs.existsSync(SOURCE_DIR);
    console.log('Directory exists:', dirExists);
    if (!dirExists) {
      console.error('❌ Source folder not found:', SOURCE_DIR);
      process.exit(1);
    }

    // Show raw entries from fs
    const allEntries = fs.readdirSync(SOURCE_DIR);
    console.log('fs.readdirSync entries count:', allEntries.length);
    console.log(allEntries.slice(0, 50)); // print first 50 file names

    // Build glob pattern and try glob
    const globPattern = path.join(SOURCE_DIR, '*.{jpg,jpeg,png}');
    console.log('Glob pattern:', globPattern);

    let files = glob.sync(globPattern, { nocase: true });
    console.log('glob.sync found:', files.length);

    // If glob failed but readdir found matching files, construct absolute paths manually
    const filtered = allEntries.filter(f => /\.(jpe?g|png)$/i.test(f));
    console.log('readdir filtered (jpg/jpeg/png) count:', filtered.length);

    if (files.length === 0 && filtered.length > 0) {
      console.log('⚠️ glob returned 0 but readdir found files. Falling back to building file paths manually.');
      files = filtered.map(f => path.join(SOURCE_DIR, f));
      console.log('Manually built files array length:', files.length);
    }

    console.log('Final files to process:', files.length);

    const manifest = {};
    for (const f of files) {
      console.log('Processing', f);
      const entry = await processFile(f);
      manifest[entry.id] = entry;
      console.log('Uploaded and created entry for', entry.id);
    }

    // write manifest locally and upload to S3 root prefix so your app can fetch it
    const manifestPath = path.join(OUT_DIR, 'manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    // upload manifest
    const mKey = `${PREFIX}/manifest.json`;
    const manifestUrl = await uploadToS3(fs.readFileSync(manifestPath), mKey, 'application/json');
    console.log('Manifest uploaded to', manifestUrl);

    console.log('Done. Manifest keys:', Object.keys(manifest));
    console.log('You can now fetch manifest.json from:', manifestUrl);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
