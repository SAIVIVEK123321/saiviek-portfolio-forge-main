
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_DIR = path.resolve('./backend/data');

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://batchalasaivivek:Vivek123@cluster0.s3yio8l.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

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

app.listen(PORT, () => {
  console.log('Backend API running on port ' + PORT);
});