require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { PythonShell } = require('python-shell');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 5001;

// Configuration
const config = {
  apiPath: path.join(__dirname, 'api'),
  embeddingsFile: 'bollywood_embeddings.pkl',
  uploadDir: path.join(__dirname, 'uploads'),
  staticDir: path.join(__dirname, 'api', 'static'),
  bollywoodDir: path.join(__dirname, 'api', 'Bollywood_data'),
  keepUploads: process.env.KEEP_UPLOADS === 'true' // Option to keep files for debugging
};

// Full paths
const embeddingsPath = path.join(config.apiPath, config.embeddingsFile);
const pythonPath = process.env.PYTHON_PATH || 'python3';

// Verify and initialize directories
async function initializeServer() {
  try {
    console.log('Server initialization:');
    console.log(`Python Path: ${pythonPath}`);
    console.log(`Embeddings Path: ${embeddingsPath}`);
    console.log(`Keep Uploads: ${config.keepUploads}`);

    await fs.access(embeddingsPath);
    
    await Promise.all([
      fs.mkdir(config.uploadDir, { recursive: true }),
      fs.mkdir(config.staticDir, { recursive: true }),
      fs.mkdir(config.bollywoodDir, { recursive: true })
    ]);

    console.log('All directories verified');
  } catch (error) {
    console.error('Initialization failed:', error);
    process.exit(1);
  }
}

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS']
}));

app.use(express.json());

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { 
    fileSize: 5 * 1024 * 1024,
    files: 1
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Static files
app.use('/static', express.static(config.staticDir));
app.use('/bollywood', express.static(config.bollywoodDir));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    services: {
      python: pythonPath,
      embeddings: fs.existsSync(embeddingsPath)
    },
    timestamp: new Date().toISOString()
  });
});

// Face matching endpoint with automatic cleanup
app.post('/api/match', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ 
      error: 'No image file uploaded',
      code: 'NO_FILE'
    });
  }

  const uploadedFilePath = req.file.path;
  let responseSent = false;

  const options = {
    mode: 'json',
    pythonPath: pythonPath,
    scriptPath: config.apiPath,
    args: [uploadedFilePath, embeddingsPath],
    pythonOptions: ['-u'],
    timeout: 30000
  };

  try {
    const results = await PythonShell.run('match_face.py', options);
    
    if (!results || !results[0]) {
      throw new Error('No valid response from Python script');
    }

    const response = results[0];
    responseSent = true;
    
    res.json(response);
  } catch (error) {
    console.error('Processing error:', error);
    
    if (!responseSent) {
      res.status(500).json({
        error: 'Face matching failed',
        code: 'PROCESSING_ERROR',
        details: error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      });
    }
  } finally {
    // Cleanup the uploaded file unless configured to keep it
    if (!config.keepUploads && uploadedFilePath) {
      try {
        await fs.unlink(uploadedFilePath);
        console.log(`Cleaned up uploaded file: ${uploadedFilePath}`);
      } catch (cleanupError) {
        console.error('File cleanup error:', cleanupError);
      }
    }
  }
});

// Scheduled cleanup for old files
const cleanupInterval = setInterval(async () => {
  try {
    const files = await fs.readdir(config.uploadDir);
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    for (const file of files) {
      const filePath = path.join(config.uploadDir, file);
      try {
        const stat = await fs.stat(filePath);
        if (now - stat.mtimeMs > oneHour) {
          await fs.unlink(filePath);
          console.log(`Cleaned up old file: ${file}`);
        }
      } catch (err) {
        console.error(`Error cleaning up ${file}:`, err);
      }
    }
  } catch (err) {
    console.error('Scheduled cleanup error:', err);
  }
}, 3600000); // Run every hour

// Clear interval on shutdown
process.on('SIGTERM', () => clearInterval(cleanupInterval));
process.on('SIGINT', () => clearInterval(cleanupInterval));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    code: 'NOT_FOUND'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    code: err.code || 'SERVER_ERROR',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
initializeServer().then(() => {
  app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT}`);
    console.log('Available endpoints:');
    console.log(`- POST /api/match`);
    console.log(`- GET /api/health`);
    console.log(`- GET /static/:filename`);
    console.log(`- GET /bollywood/:path`);
  });
}).catch(error => {
  console.error('Failed to initialize server:', error);
  process.exit(1);
});