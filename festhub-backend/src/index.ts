import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

import authRoutes from './routes/auth.routes';
import eventRoutes from './routes/event.routes';

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'FestHub API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
