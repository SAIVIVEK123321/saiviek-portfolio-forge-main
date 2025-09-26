
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_DIR = path.resolve('./backend/data');

const allowedOrigins = [
  'https://sai-vivek-portfolio.onrender.com', // production frontend
  'http://localhost:5173', // local frontend (Vite default)
  'http://localhost:8080', // local frontend (custom port)
  'http://localhost:3000', // alternative local port
  'http://127.0.0.1:8080', // localhost alternative
  'http://127.0.0.1:5173', // localhost alternative
];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(bodyParser.json());

// Root route to show backend is working
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Backend API Status</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                color: white;
            }
            .container {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 40px;
                text-align: center;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            h1 {
                font-size: 2.5em;
                margin-bottom: 10px;
                color: #4ade80;
            }
            .status {
                font-size: 1.2em;
                margin-bottom: 20px;
                color: #e5e7eb;
            }
            .details {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 20px;
                margin-top: 20px;
                text-align: left;
            }
            .endpoint {
                margin: 10px 0;
                padding: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 5px;
                font-family: 'Courier New', monospace;
            }
            .timestamp {
                font-size: 0.9em;
                color: #9ca3af;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>✅ Backend API</h1>
            <div class="status">Server is running successfully!</div>
            <div class="details">
                <h3>Available Endpoints:</h3>
                <div class="endpoint">GET /contact-info</div>
                <div class="endpoint">GET /skills</div>
                <div class="endpoint">GET /projects</div>
                <div class="endpoint">GET /certifications</div>
                <div class="endpoint">GET /experiences</div>
                <div class="endpoint">GET /about</div>
            </div>
            <div class="timestamp">
                Server started at: ${new Date().toLocaleString()}
            </div>
        </div>
    </body>
    </html>
  `);
});

// Connect to MongoDB Atlas
const connectDB = async () => {
  try {
    // Updated connection string with proper database name and options
    const mongoURI = 'mongodb+srv://batchalasaivivek:Vivek123@cluster0.s3yio8l.mongodb.net/portfolio?retryWrites=true&w=majority';
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    // Fallback to local MongoDB if Atlas fails
    try {
      console.log('🔄 Attempting to connect to local MongoDB...');
      await mongoose.connect('mongodb://localhost:27017/portfolio');
      console.log('✅ Local MongoDB connected successfully');
    } catch (localError) {
      console.error('❌ Local MongoDB connection also failed:', localError.message);
      console.log('💡 Please ensure MongoDB is running locally or check your Atlas connection string');
      // Don't exit the process, let the server run without DB for now
    }
  }
};

// Connect to database
connectDB();

// Skill Model
const skillSchema = new mongoose.Schema({
  title: String,
  icon: String,
  skills: String, // or [String] if you want an array
});
const Skill = mongoose.model('Skill', skillSchema);

// Certification Model
const certSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  date: String,
  image: String,
  description: String,
  details: String, // or [String]
});
const Certification = mongoose.model('Certification', certSchema);

// Project Model
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tech: String, // or [String]
  image: String,
  stats: String,
  category: String,
  githubLink: String,
  deploymentLink: String,
});
const Project = mongoose.model('Project', projectSchema);

// Contact Info Model
const contactInfoSchema = new mongoose.Schema({
  email: String,
  github: String,
  linkedin: String,
  phone: String,
  resumeUrl: String,
  profilePictureUrl: String,
});
const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);

// Experience Model
const experienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  startDate: String,
  endDate: String,
  description: String,
  image: String, // optional
});
const Experience = mongoose.model('Experience', experienceSchema);

// About Model
const aboutSchema = new mongoose.Schema({
  intro: String,
  description: String,
  roles: [
    {
      title: String,
      icon: String, // e.g. 'Code', 'Briefcase'
      description: String,
    },
  ],
  skills: [
    {
      category: String,
      items: [String],
    },
  ],
  education: [
    {
      degree: String,
      school: String,
      details: String,
    },
  ],
  focusAreas: [String],
});
const About = mongoose.model('About', aboutSchema);

// Set up multer for image uploads
const UPLOADS_DIR = path.resolve('uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname.replace(/\s+/g, '_'));
  },
});
const upload = multer({ storage });

// Serve uploaded images
app.use('/uploads', express.static(UPLOADS_DIR));

// Authentication middleware (simple password)
const authenticate = (req, res, next) => {
  const adminPassword = 'mahi@123';
  const { authorization } = req.headers;
  if (authorization === `Bearer ${adminPassword}`) return next();
  return res.status(401).json({ error: 'Unauthorized' });
};

// Image upload endpoint
app.post('/upload', authenticate, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

// Skills endpoints
app.get('/skills', async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
});
app.put('/skills', authenticate, async (req, res) => {
  const skills = req.body;

  if (!Array.isArray(skills)) {
    return res.status(400).json({ error: 'Request body must be an array of skills.' });
  }

  for (const skill of skills) {
    if (!skill.title || !skill.icon || !skill.skills) {
      return res.status(400).json({ error: 'Each skill must have a title, icon, and skills.' });
    }
  }

  await Skill.deleteMany({});
  await Skill.insertMany(req.body);
  res.json({ success: true });
});

// Certifications endpoints
app.get('/certifications', async (req, res) => {
  const certs = await Certification.find();
  res.json(certs);
});
app.put('/certifications', authenticate, async (req, res) => {
  const certifications = req.body;

  if (!Array.isArray(certifications)) {
    return res.status(400).json({ error: 'Request body must be an array of certifications.' });
  }

  for (const cert of certifications) {
    if (!cert.title || !cert.issuer || !cert.date) {
      return res.status(400).json({ error: 'Each certification must have a title, issuer, and date.' });
    }
  }

  await Certification.deleteMany({});
  await Certification.insertMany(req.body);
  res.json({ success: true });
});

// Projects endpoints
app.get('/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});
app.put('/projects', authenticate, async (req, res) => {
  const projects = req.body;

  if (!Array.isArray(projects)) {
    return res.status(400).json({ error: 'Request body must be an array of projects.' });
  }

  for (const project of projects) {
    if (!project.title || !project.description) {
      return res.status(400).json({ error: 'Each project must have at least a title and a description.' });
    }
  }

  await Project.deleteMany({});
  await Project.insertMany(req.body);
  res.json({ success: true });
});

// Experiences endpoints
app.get('/experiences', async (req, res) => {
  const experiences = await Experience.find();
  res.json(experiences);
});
app.put('/experiences', authenticate, async (req, res) => {
  const experiences = req.body;

  if (!Array.isArray(experiences)) {
    return res.status(400).json({ error: 'Request body must be an array of experiences.' });
  }

  for (const exp of experiences) {
    if (!exp.title || !exp.company || !exp.startDate) {
      return res.status(400).json({ error: 'Each experience must have a title, company, and startDate.' });
    }
  }

  await Experience.deleteMany({});
  await Experience.insertMany(req.body);
  res.json({ success: true });
});

// Contact Info endpoints
app.get('/contact-info', async (req, res) => {
  const info = await ContactInfo.findOne();
  res.json(info || {});
});
app.put('/contact-info', authenticate, async (req, res) => {
  const contactInfo = req.body;

  if (!contactInfo.email || !contactInfo.github || !contactInfo.linkedin) {
    return res.status(400).json({ error: 'Contact info must have an email, github, and linkedin.' });
  }

  await ContactInfo.deleteMany({});
  await ContactInfo.create(req.body);
  res.json({ success: true });
});

// About endpoints
app.get('/about', async (req, res) => {
  const about = await About.findOne();
  res.json(about || {});
});
app.put('/about', authenticate, async (req, res) => {
  const about = req.body;
  await About.deleteMany({});
  await About.create(about);
  res.json({ success: true });
});

// Serve static files from the frontend public directory
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Catch-all: send index.html for any route not handled above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Backend API running on port ' + PORT);
});