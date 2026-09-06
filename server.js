const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const businessRoutes = require('./routes/business');
const appointmentRoutes = require('./routes/appointment');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const reviewRoutes = require('./routes/review');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('join_appointment_room', (appointmentId) => {
    socket.join(`appointment_${appointmentId}`);
  });

  socket.on('appointment_updated', (data) => {
    io.to(`appointment_${data.appointmentId}`).emit('appointment_status_changed', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Store io instance in app
app.set('io', io);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/review', reviewRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

module.exports = { app, io };
