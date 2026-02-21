const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

// Upload directory: src/images/UploadImg (relative to this file in src/backend)
const UPLOAD_DIR = path.join(__dirname, '..', 'images', 'UploadImg');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log('Created upload directory:', UPLOAD_DIR);
}

// Multer: store files with unique names in UploadImg
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
    const name = `${base}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    cb(null, name);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
  fileFilter: (req, file, cb) => {
    const allowed = /\.(jpe?g|png|gif|webp)$/i.test(file.originalname);
    if (allowed) cb(null, true);
    else cb(new Error('Only image files (jpg, png, gif, webp) are allowed.'), false);
  },
});

app.use(cors({ origin: true }));
app.use(express.json());

// Serve uploaded images at /uploads so frontend can use these URLs
app.use('/uploads', express.static(UPLOAD_DIR));

// POST /createproject – receive images (files) + project text
app.post('/createproject', upload.array('images', 20), (req, res) => {
  try {
    const name = (req.body.name || req.body.projectName || '').trim();
    const sector = (req.body.sector || 'Commercial & institutional').trim();
    const description = (req.body.description || req.body.text || '').trim();

    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one image file is required.',
      });
    }

    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    const imageUrls = files.map((f) => `${baseUrl}/uploads/${f.filename}`);

    res.status(201).json({
      success: true,
      project: {
        name: name || 'Untitled Project',
        sector: sector || 'Commercial & institutional',
        description,
        imageUrls,
        filesSaved: files.length,
      },
    });
  } catch (err) {
    console.error('createproject error:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Server error.',
    });
  }
});

// Multer error (e.g. file type or size)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, error: 'File too large. Max 10MB per file.' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ success: false, error: 'Too many files. Max 20 images.' });
    }
  }
  if (err.message) {
    return res.status(400).json({ success: false, error: err.message });
  }
  next(err);
});

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Upload directory:', UPLOAD_DIR);
  console.log('POST /createproject – send multipart/form-data: images (files), name, sector, description');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\nPort ${PORT} is already in use. The backend may already be running.`);
    console.error('Use it at http://localhost:' + PORT + ' or free the port and try again.');
    process.exit(1);
  }
  throw err;
});
