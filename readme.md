# 🏠 HouseHub - Comprehensive House Management Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)

## 🌟 Overview

HouseHub is an enterprise-level house management application designed to address the Irish housing crisis by providing comprehensive organizational tools for shared accommodations. This platform streamlines household management, reduces conflicts, and improves living conditions for both landlords and tenants in shared housing environments.

### 🎯 Mission Statement

In response to Ireland's accommodation challenges, HouseHub serves as the digital backbone for modern shared living, transforming chaotic house management into organized, transparent, and collaborative experiences.

---

## 🚀 Key Features

### 👥 User Management & Authentication
- **Secure Registration & Login** - JWT-based authentication system
- **Role-Based Access Control** - Landlord and Tenant specific permissions
- **Profile Management** - Customizable user profiles with photo uploads
- **Theme Customization** - Multiple color themes for personalized experience

### 🏠 House Management
- **House Creation & Registration** - Landlords can create houses with unique IDs and keys
- **Tenant Invitation System** - Secure house joining via unique house keys
- **Multi-House Support** - Support for landlords managing multiple properties
- **Address & Location Tracking** - Irish Eircode integration

### 💬 Real-Time Communication
- **Live House Chat** - Socket.IO powered real-time messaging
- **Typing Indicators** - See when housemates are typing
- **Message History** - Persistent chat storage with MongoDB
- **User Presence** - Online/offline status tracking

### 📝 Task & Project Management
- **To-Do Lists** - Personal and shared task management
- **Recurring Tasks** - Automated task scheduling (daily, weekly, monthly)
- **Task Assignment** - Assign tasks to specific housemates
- **Status Tracking** - Mark tasks as complete with completion dates
- **Due Date Management** - Never miss important deadlines

### 💰 Financial Management
- **Bill Tracking** - Comprehensive utility and expense management
- **Split Payments** - Fair bill splitting among housemates
- **Payment History** - Track who has paid what and when
- **Due Date Alerts** - Visual indicators for upcoming bills
- **Remaining Balance Tracking** - Real-time payment status

### 📋 Memo System
- **Digital Notice Board** - House-wide announcements and reminders
- **Rich Text Support** - Create detailed memos with formatting
- **Edit & Delete Permissions** - Full CRUD operations for memo management
- **Persistent Storage** - All memos saved with timestamps

### 📊 Admin Dashboard
- **Landlord Dashboard** - Complete house oversight and tenant management
- **Tenant Dashboard** - Access to house information and housemate details
- **Analytics Overview** - Task completion rates and payment tracking
- **House Statistics** - Key metrics for house management

---

## 🛠️ Technology Stack

### Frontend
- **React 19.0.0** - Modern React with latest features
- **Material-UI v6** - Professional, accessible UI components
- **React Router v7** - Client-side routing and navigation
- **Socket.IO Client** - Real-time bidirectional communication
- **Axios** - HTTP client for API requests
- **React Bootstrap** - Additional styling components

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.21** - Fast, unopinionated web framework
- **Socket.IO 4.8** - Real-time engine for chat functionality
- **JWT Authentication** - Secure token-based authentication
- **Multer** - File upload handling for profile images
- **CORS** - Cross-origin resource sharing middleware

### Database
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **Mongoose 8.10** - Elegant MongoDB object modeling
- **UUID Generation** - Unique identifier generation for entities

### Additional Tools
- **bcryptjs** - Password hashing and security
- **dotenv** - Environment variable management
- **Nodemon** - Development server auto-restart
- **SASS** - Enhanced CSS preprocessing

---

## 📁 Project Structure

```
HouseHub/
├── backend/                    # Node.js/Express server
│   ├── middleware/            # Authentication & file upload middleware
│   │   ├── authorisationMiddleware.js
│   │   ├── authoriseSocketMiddleware.js
│   │   └── multer.js
│   ├── models/               # MongoDB data models
│   │   ├── billTrackerModel.js
│   │   ├── chatModel.js
│   │   ├── houseModel.js
│   │   ├── memosModel.js
│   │   ├── schedulerModel.js
│   │   ├── todolistModel.js
│   │   └── userModel.js
│   ├── routes/               # API route handlers
│   │   ├── billTrackerRoutes.js
│   │   ├── houseRoutes.js
│   │   ├── memosRoutes.js
│   │   ├── schedulerRoutes.js
│   │   ├── todolistRoutes.js
│   │   └── userRoutes.js
│   ├── socket/               # Real-time communication
│   │   └── socket.js
│   ├── uploads/              # User uploaded files
│   └── utils/                # Utility functions
│       └── generateToken.js
├── client/                   # React frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   │   ├── adminPage/    # Admin dashboard components
│   │   │   ├── dashboard/    # Main dashboard components
│   │   │   ├── Landing/      # Landing page components
│   │   │   ├── layout/       # Layout components (Navigation)
│   │   │   └── login/        # Authentication components
│   │   ├── pages/            # Page-level components
│   │   ├── theme/            # Custom Material-UI themes
│   │   └── assets/           # Images and static resources
└── README.md
```

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB instance)
- Git for version control

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/andrepontde/HouseHub.git
   cd HouseHub/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5001
   ```

4. **Start the backend server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd ../client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5001`

---

## 📱 Usage Guide

### Getting Started

1. **Registration**
   - Create an account by selecting either "Landlord" or "Tenant" role
   - Complete profile setup with personal information

2. **House Setup**
   - **Landlords**: Create a new house with address and Eircode
   - **Tenants**: Join existing house using the unique house key provided by landlord

3. **Dashboard Navigation**
   - Access main dashboard for quick overview of tasks, bills, and memos
   - Use the navigation bar to access different features

### Core Workflows

#### Task Management
1. Create tasks with due dates and descriptions
2. Set up recurring tasks for regular household duties
3. Assign tasks to specific housemates
4. Track completion status and manage deadlines

#### Bill Management
1. Create bills with title, description, amount, and due date
2. Track payments from individual housemates
3. Monitor remaining balances and payment history
4. Receive visual indicators for upcoming due dates

#### Communication
1. Access house chat for real-time communication
2. Create memos for important announcements
3. Edit and manage house-wide notifications

---

## 🔐 Security Features

- **JWT Authentication** - Secure token-based user sessions
- **Password Hashing** - bcrypt encryption for password storage
- **Route Protection** - Middleware-based route authentication
- **Role-Based Permissions** - Differentiated access for landlords and tenants
- **Secure File Uploads** - Multer-based image upload with validation
- **CORS Configuration** - Controlled cross-origin resource sharing

---

## 🌐 API Documentation

### Authentication Endpoints
- `POST /api/user/registration` - User registration
- `POST /api/user/login` - User authentication
- `GET /api/user/user` - Get current user details

### House Management
- `POST /api/house/create` - Create new house (Landlord)
- `POST /api/house/join` - Join existing house (Tenant)
- `GET /api/house/house` - Get house details

### Task Management
- `GET /api/todolist/house` - Get house tasks
- `POST /api/todolist/create` - Create new task
- `PUT /api/todolist/update/:id` - Update task
- `DELETE /api/todolist/delete/:id` - Delete task

### Bill Management
- `GET /api/bills/house` - Get house bills
- `POST /api/bills/create` - Create new bill
- `POST /api/bills/pay/:id` - Make payment
- `DELETE /api/bills/delete/:id` - Delete bill

### Real-time Events
- `join_house` - Join house chat room
- `send_message` - Send chat message
- `receive_message` - Receive chat message
- `typing` - Typing indicator events

---

## 🤝 Contributing

We welcome contributions to HouseHub! Here's how you can help:

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines
- Follow existing code formatting and naming conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure responsive design for all UI components
- Write descriptive commit messages

### Testing
- Test all new features thoroughly
- Ensure cross-browser compatibility
- Test responsive design on multiple screen sizes
- Verify API endpoints work correctly

---

## 🐛 Known Issues & Roadmap

### Current Limitations
- Chat history pagination not implemented
- Limited file upload size for profile images
- No push notifications for mobile devices

### Upcoming Features
- **Mobile App** - React Native implementation
- **Advanced Analytics** - Detailed house management insights
- **Calendar Integration** - Sync with Google Calendar/Outlook
- **Expense Categories** - Categorized bill tracking
- **Document Storage** - Lease agreements and important documents
- **Maintenance Requests** - Landlord-tenant maintenance workflow
- **Rating System** - Housemate and property ratings

---

## 📞 Support & Contact

For technical support, feature requests, or general inquiries:

- **GitHub Issues**: [Create an issue](https://github.com/andrepontde/HouseHub/issues)
- **Email**: support@househub.ie
- **Documentation**: [Wiki Page](https://github.com/andrepontde/HouseHub/wiki)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Developed in response to the Irish housing crisis
- Thanks to all beta testers and early adopters
- Material-UI team for excellent component library
- MongoDB Atlas for reliable cloud database hosting
- Socket.IO team for real-time communication framework

---

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added recurring tasks and improved UI
- **v1.2.0** - Enhanced chat functionality and bill splitting
- **v1.3.0** - Theme customization and profile management

---

*HouseHub - Making shared living simple, organized, and harmonious.* 🏠✨
