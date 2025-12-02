import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import adminAuthRoutes from './routes/admin/auth.js';
import adminModuleRoutes from './routes/admin/modules.js';
import adminVendorRoutes from './routes/admin/vendors.js';
import adminCategoryRoutes from './routes/admin/categories.js';
import adminProductRoutes from './routes/admin/products.js';
import adminUserRoutes from './routes/admin/users.js';

dotenv.config();
const app = express();

// ✅ CORS setup for frontend on Render
app.use(cors({
  origin: 'https://front-frontend-admin.onrender.com', // allow only your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

const PORT = process.env.PORT || 5001;
const MONGO = process.env.MONGO_URI;

if (!MONGO) {
  console.error('MONGO_URI missing in .env');
  process.exit(1);
}

mongoose.connect(MONGO, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => { console.error(err); process.exit(1); });

// Admin routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/modules', adminModuleRoutes);
app.use('/api/admin/vendors', adminVendorRoutes);
app.use('/api/admin/categories', adminCategoryRoutes);
app.use('/api/admin/products', adminProductRoutes);
app.use('/api/admin/users', adminUserRoutes);

app.get('/', (req,res) => res.send('Admin backend running'));

app.listen(PORT, () => console.log(`Admin server running on port ${PORT}`));
