# AyushAI - Ayurvedic Health Assistant

AyushAI combines ancient Ayurvedic wisdom with modern AI technology to provide personalized health recommendations based on user symptoms.

## Table of Contents

- [Project Overview](#project-overview)
- [System Architecture](#system-architecture)
- [Features](#features)
- [Frontend Structure](#frontend-structure)
- [Backend Structure](#backend-structure)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [Development Setup](#development-setup)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Future Enhancements](#future-enhancements)

## Project Overview

AyushAI is a comprehensive web application designed to bridge traditional Ayurvedic medicine with modern technology. The platform offers:

- AI-powered chat for personalized health recommendations
- Curated collection of Ayurvedic remedies
- Directory of Ayurvedic practitioners
- User authentication and profiles

The application is built with a React frontend and Node.js backend, using MongoDB as the database.

## System Architecture

### Frontend
- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS 4.1.5
- **Routing**: React Router
- **UI Components**: Radix UI
- **Animation**: Framer Motion
- **State Management**: React Context API
- **Deployment**: Netlify

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express 5.1.0
- **Database**: MongoDB 8.14.1 with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Deployment**: Render.com

## Features

### 1. AI Chat Assistant
- Natural language processing for symptom analysis
- Personalized Ayurvedic recommendations
- Remedy suggestions based on user symptoms
- Conversation history

### 2. Ayurvedic Remedy Browser
- Comprehensive collection of traditional remedies
- Filtering by dosha type (vata, pitta, kapha)
- Categorization (Digestion, Immunity, Respiratory, etc.)
- Detailed information including ingredients, instructions, and benefits
- Difficulty and preparation time indicators

### 3. Practitioner Directory
- Search for practitioners by specialization and location
- Practitioner profiles with qualifications and experience
- Rating and review system
- Appointment scheduling

### 4. User Authentication
- Secure signup and login
- Password recovery
- JWT-based authentication
- User profiles

## Frontend Structure

### Directory Structure
```
Frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── RemedyCard.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Chat.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Practitioners.jsx
│   │   ├── Profile.jsx
│   │   ├── Remedies.jsx
│   │   └── ...
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── ...
```

### Key Components

#### App.jsx
Main application component with routing configuration:
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/chat" element={<Chat />} />
  <Route path="/practitioners" element={<Practitioners />} />
  <Route path="/remedies" element={<Remedies />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/forgot-password" element={<ForgetPassword />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

#### RemedyCard.jsx
Component for displaying individual remedy cards:
```jsx
export default function RemedyCard({ 
  id, 
  name, 
  description, 
  imageUrl, 
  doshas, 
  likes = 0,
  duration = "15 mins",
  difficulty = "Easy"
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white opacity-90 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 filter sepia-10 saturate-125">
      {/* Image with overlay */}
      <div className="relative h-48 w-full">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        {/* Content */}
      </div>
    </div>
  );
}
```

#### Chat.jsx
AI chat interface with message handling:
```jsx
// Sending messages to the backend
try {
  const response = await axios.post("https://ayushai-1.onrender.com/api/chat", {
    message: input,
  });

  const data = response.data;

  let replyContent = "";

  if (Array.isArray(data) && data.length > 0) {
    replyContent = data
      .map((remedy, index) => {
        return `🩺 Remedy ${index + 1}:
🔹 Symptoms: ${remedy.symptoms.join(", ")}
🌿 Remedies: ${remedy.remedy.join(", ")}
📝 Description: ${remedy.description}`;
      })
      .join("\n\n");
  } else {
    replyContent = "No remedies found for your symptoms.";
  }

  // Add bot message to chat
}
```

## Backend Structure

### Directory Structure
```
Backend/
├── module/
│   ├── chat.js
│   ├── message.js
│   ├── Practitioner.js
│   ├── Remedy.js
│   └── ...
├── Routes/
│   ├── auth.js
│   ├── chat.js
│   ├── practitioner.js
│   └── ...
├── server.js
├── package.json
└── ...
```

### Server Configuration (server.js)
```javascript
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './Routes/auth.js';
import chatRoutes from './Routes/chat.js';
import practitionerRoutes from './Routes/practitioner.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/practitioners', practitionerRoutes);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
})
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Password recovery

### Chat Endpoints
- `POST /api/chat` - Send message to AI assistant
- `GET /api/chat/history` - Get chat history

### Practitioners Endpoints
- `GET /api/practitioners` - Get all practitioners
- `GET /api/practitioners/:id` - Get practitioner details
- `POST /api/practitioners/review` - Add review for practitioner

### Remedies Endpoints
- `GET /api/remedies` - Get all remedies
- `GET /api/remedies/:id` - Get remedy details
- `GET /api/remedies/search` - Search remedies

## Database Models

### Remedy Model
```javascript
const remedySchema = new mongoose.Schema({
    symptoms: {
        type: [String],
        required: true,
    },
    remedy: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
```

### Practitioner Model
```javascript
const practitionerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    qualifications: [String],
    availability: [{
        day: String,
        startTime: String,
        endTime: String
    }],
    rating: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: Number,
        comment: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
```

### Chat Model
```javascript
const chatSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    lastMessage: {
        type: Date,
        default: Date.now
    }
});
```

### Message Model
```javascript
const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        default: false
    }
});
```

## Development Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- MongoDB Atlas account

### Frontend Setup
1. Navigate to the Frontend directory:
   ```
   cd Frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. The application will be available at `http://localhost:5173`

### Backend Setup
1. Navigate to the Backend directory:
   ```
   cd Backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. The API will be available at `http://localhost:3000`

## Deployment

### Frontend Deployment (Netlify)

Configuration in `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Deployment steps:
1. Build the project:
   ```
   npm run build
   ```

2. Deploy to Netlify:
   - Connect your GitHub repository to Netlify
   - Configure build settings as specified in `netlify.toml`
   - Deploy

### Backend Deployment (Render.com)

Configuration in `render.yaml`:
```yaml
services:
  - type: web
    name: ayushai-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: "3000"
      - key: MONGODB_URI
        fromEnvVar: MONGODB_URI
      - key: JWT_SECRET
        fromEnvVar: JWT_SECRET
    healthCheckPath: /health
    allowedDomains:
      - ayushai-backend.onrender.com
```

Deployment steps:
1. Connect your GitHub repository to Render.com
2. Configure environment variables
3. Deploy the service

## Environment Variables

### Frontend
- No sensitive environment variables should be stored in the frontend

### Backend
- `NODE_ENV`: Set to `production` for production environment
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation and validation

## Future Enhancements

### Short-term Roadmap
- Enhanced user profiles with health tracking
- Expanded remedy database with user contributions
- Improved AI chat with multi-language support
- Mobile-responsive design optimizations

### Long-term Vision
- Native mobile applications (iOS/Android)
- Integration with wearable health devices
- Telemedicine features for practitioner consultations
- Community forums for user discussions
- Personalized health plans based on user data

## Contributing

We welcome contributions to AyushAI! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
