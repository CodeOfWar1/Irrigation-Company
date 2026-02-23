require("dotenv").config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

const DIST_DIR = path.join(__dirname, 'dist');
const UPLOAD_DIR = path.join(__dirname, 'images');

// Supabase setup
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// Ensure upload folder exists
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(UPLOAD_DIR));
app.use(express.static(DIST_DIR));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, /\.(jpe?g|png|gif|webp)$/i.test(file.originalname)),
});

// API routes
app.post('/createproject', upload.array('images', 20), async (req, res) => {
  try {
    const files = req.files;
    if (!files?.length) return res.status(400).json({ error: 'At least one image required' });

    const imageUrls = files.map(f => `/images/${f.filename}`);

    const { data, error } = await supabase
      .from('portfolio_projects')
      .insert({
        name: req.body.name?.trim() || 'Untitled',
        sector: req.body.sector?.trim() || 'Commercial & institutional',
        image_urls: imageUrls,
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, project: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Error handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const msg = err.code === 'LIMIT_FILE_SIZE' ? 'Max 10MB' : 
                err.code === 'LIMIT_FILE_COUNT' ? 'Max 20 images' : err.message;
    return res.status(400).json({ error: msg });
  }
  res.status(400).json({ error: err.message });
});

// Catch-all route for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));