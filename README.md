## 🌐 Live Demo (Production)

**URL:** [https://weather-guardian.onrender.com/login](https://weather-guardian.onrender.com/login)

> 🕒 Please note: this is hosted on Render's free tier, so the backend may take **up to 30 seconds** to spin up after inactivity. Thanks for your patience!


# 🌦️ Weather Guardian – Real-Time Weather Alert System

Weather Guardian is a full-stack web application that allows users to:
- Monitor real-time weather conditions
- Set up custom weather alerts by location and weather parameters
- Get notified when thresholds are crossed
- View historical alert triggers from the last 24 hours

---

## 🛠 Tech Stack

### 🔷 **Client (Frontend)** – React.js
- **Framework:** React (via `create-react-app`)
- **Component Library:** [Material UI (MUI)](https://mui.com/)
- **Routing:** `react-router-dom`
- **State & Context:** React Context API (`AuthContext`)
- **Icons:** MUI Icons
- **HTTP Client:** Native Fetch API

### 🟢 **Server (Backend)** – Node.js + Express
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (via Mongoose)
- **Authentication:** JWT-based Auth
- **Email Notifications:** [nodemailer](https://www.nodemailer.com/)
- **Scheduled Jobs:** [node-cron](https://www.npmjs.com/package/node-cron)
- **External API:** [Tomorrow.io API](https://www.tomorrow.io/)

---

## 📦 External Libraries & NPM Packages

### 🔹 **Frontend**
```bash
npm install react react-dom react-router-dom @mui/material @mui/icons-material
```

### 🔹 **Backend**
```bash
npm install express mongoose dotenv cors jsonwebtoken bcryptjs nodemailer node-cron axios
```

---

## 🚀 Getting Started

### 📁 Project Structure

```
project-root/
├── client/                 # React frontend
│   ├── src/
│   └── .env                # REACT_APP_API_BASE_URL
├── server/                 # Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── services/
│   ├── jobs/
│   └── .env                # API keys, DB URI, etc.
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/weather-guardian.git
cd weather-guardian
```

---

### 2. Setup Backend

```bash
cd server
npm install
```

**Create `.env` file inside `/server` with:**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_app_password
TOMORROW_API_KEY=your_tomorrow_io_api_key
```

**Start the server:**
```bash
npm start
```

---

### 3. Setup Frontend

```bash
cd client
npm install
```

**Create `.env` file inside `/client` with:**
```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

**Start the React app:**
```bash
npm start
```

---

## 🔔 Features

- 🔐 User registration & login (JWT-auth)
- 📍 Add alerts by city or coordinates
- 🧠 Track temperature, wind speed, and precipitation
- ⏱️ Scheduled checks every 5 minutes for triggered alerts
- 📩 Email notifications when conditions are met
- 📊 View alerts from the last 24 hours
- 🔄 Responsive UI for mobile and desktop
---

## 📝 License

MIT License © 2025 Your Name

---

## 📌 Notes

- Ensure your Gmail account has [App Passwords](https://support.google.com/accounts/answer/185833) enabled if 2FA is on.
- Free-tier Tomorrow.io accounts may have rate limits.
- To deploy, use platforms like Vercel (frontend) and Render/Heroku (backend).


---


