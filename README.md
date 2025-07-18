# 🏏 LifeEase - Real-Time Cricket Scoring App

**LifeEase** is a full-stack real-time cricket scoring app that lets you start matches, record commentary, and display live updates using WebSockets.

---

## 📂 Project Structure

LifeEase/
├── backend/ # NestJS backend (API + WebSocket)
├── frontend/ # Next.js frontend (React + Tailwind)
└── README.md


---

## ⚙️ Requirements

- Node.js (v18 or newer)
- MongoDB (local or cloud like Atlas)
- npm or yarn

---

## 🚀 Getting Started

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/your-username/LifeEase.git
cd LifeEase

2. Setup and Run Backend

cd backend
npm install
npm run start:dev

Runs at: http://localhost:3000

 3. Setup and Run Frontend

 cd ../frontend
npm install
npm run dev

Runs at: http://localhost:3001 (or port 3000 by default)


API Testing (cURL Examples)

 Start a Match

 curl -X POST http://localhost:3000/matches \
  -H "Content-Type: application/json" \
  -d '{"teamA": "India", "teamB": "Australia"}'


Add Commentary


curl -X POST http://localhost:3000/matches/1001/commentary \
  -H "Content-Type: application/json" \
  -d '{
    "over": 1,
    "ball": 2,
    "eventType": "run",
    "message": "Kohli hits a four through covers",
    "runs": 4
  }'


curl http://localhost:3000/matches/1001
