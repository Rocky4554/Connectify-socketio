# Connectify 

Connectify is a fullstack, real-time communication platform that enables seamless messaging and video calling. With a modern tech stack and scalable architecture, it supports secure, responsive, and customizable user experiences for both individual and group interactions.

## ✨ Features

- **💬 Real-time Messaging**: Instant chat with typing indicators and emoji reactions for dynamic conversations
- **📹 Video Calling**: 1-on-1 and group video calls, with screen sharing and recording capabilities
- **🔒 Secure Authentication**: JWT-based authentication with protected routes for robust security
- **🎨 Customizable UI**: 32 unique themes for personalized user interfaces
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🔔 Real-time Notifications**: Instant alerts for messages and call invitations
- **👤 User Profiles**: Customizable avatars and status updates for personalized user experiences
- **⚙️ Scalable Infrastructure**: Built with Stream.io for reliable chat and video services
- **🚨 Error Handling**: Comprehensive error management on frontend and backend
- **🚀 Deployment Ready**: Configured for easy deployment on free-tier hosting platforms

## 🛠️ Tech Stack

- **Frontend**: React, TailwindCSS, TanStack Query, Zustand (state management)
- **Backend**: Express, MongoDB
- **APIs**: Stream.io for real-time chat and video
- **Authentication**: JSON Web Tokens (JWT)
- **Build Tool**: Vite (frontend)
- **Environment**: Node.js

## 👥 Demo Users

Test the application using the following demo accounts:

| Username | Email | Password |
|----------|--------|----------|
| batman | batmandark@gmail.com | darknight45 |
| superman | clerk@gmail.com | superman@123 |

> **Note**: These accounts are for testing only. Do not use them in production or share sensitive data.

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js**: Version 16 or higher
- **MongoDB**: Local or cloud instance (e.g., MongoDB Atlas)
- **Stream.io Account**: Obtain API keys from getstream.io

### 🛠️ Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Rocky4554/Connectify.git
   cd Connectify
   ```

2. **Backend Setup**:
   
   Navigate to the backend directory:
   ```bash
   cd backend
   ```
   
   Install dependencies:
   ```bash
   npm install
   ```
   
   Create a `.env` file in `/backend` with the following:
   ```env
   PORT=5001
   MONGO_URI=your_mongo_uri
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   JWT_SECRET_KEY=your_jwt_secret
   NODE_ENV=development
   ```
   
   Start the backend:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**:
   
   Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
   
   Install dependencies:
   ```bash
   npm install
   ```
   
   Create a `.env` file in `/frontend` with the following:
   ```env
   VITE_STREAM_API_KEY=your_stream_api_key
   ```
   
   Start the frontend:
   ```bash
   npm run dev
   ```

4. **Access the Application**:
   - Backend runs on `http://localhost:5001`
   - Frontend runs on `http://localhost:5173` (or another port assigned by Vite)

## 📂 Project Structure

```
Connectify/
├── backend/                # Express server and MongoDB integration
│   ├── routes/             # API routes (e.g., auth, chat, video)
│   ├── models/             # MongoDB schemas
│   └── index.js            # Backend entry point
├── frontend/               # React frontend
│   ├── src/                # React components, hooks, and utilities
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
└── README.md               # Project documentation
```

## 📖 Usage

- **Sign Up/Login**: Use demo credentials or create a new account
- **Messaging**: Start real-time chats with typing indicators and reactions
- **Video Calls**: Initiate 1-on-1 or group calls with screen sharing
- **Customization**: Select from 32 UI themes and update your profile
- **Notifications**: Receive alerts for new messages or call invitations

## 🤝 Contributing

We welcome contributions to enhance Connectify. To contribute:

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request with a detailed description of your changes

Please adhere to the project's coding standards and include tests where applicable.

## 🔮 Roadmap

- 🔐 Add end-to-end encryption for messages and calls
- 📎 Implement file sharing in chats
- 🌍 Support multi-language localization
- 🤖 Integrate AI-powered chat moderation
- ⚡ Enhance performance with server-side rendering

## 🌟 Future Features

We are actively working on enhancing Connectify with the following features:

- **🎙️ Voice Messaging**: Enable users to send and receive voice messages in chats for more flexible communication
- **🤖 Chatbots Integration**: Introduce AI-powered chatbots for automated responses and user assistance
- **✏️ Screen Annotation**: Add real-time annotation tools during screen sharing for collaborative meetings
- **📴 Offline Mode**: Allow users to view cached messages and draft responses when offline
- **📊 Advanced Analytics**: Provide users with insights into chat and call usage, such as message frequency or call duration

### Suggested Features:

- **🛡️ Group Chat Moderation**: Add tools for group admins to manage participants and mute disruptive users
- **😄 Custom Emojis**: Allow users to upload and use custom emojis in chats
- **📅 Calendar Integration**: Sync video calls with Google Calendar or Outlook for scheduling

## 🆘 Support

For issues, feature requests, or questions, please:

- Open an issue on the [GitHub Issues](https://github.com/Rocky4554/Connectify/issues) page
- Contact the maintainer at [maintainer-email@example.com] (replace with actual contact)

---

Made with ❤️ by the Connectify team
