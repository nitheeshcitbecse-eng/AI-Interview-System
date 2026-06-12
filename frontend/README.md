# Advanced AI Interview System Frontend

A modern, feature-rich frontend for the AI Interview System with advanced animations, real-time feedback, and comprehensive interview analytics.

## Features

- **Mock Interview Module** - Real-time AI interactions with live analysis
- **Resume Analyzer** - AI-powered resume evaluation with detailed feedback
- **Live Analysis Dashboard** - Real-time metrics (Confidence, Clarity, Pace, Engagement)
- **Interview History** - Track and review past interviews
- **AI Feedback System** - Detailed performance analysis and recommendations
- **Advanced Animations** - Smooth Framer Motion transitions
- **Responsive Design** - Works on all devices
- **Dark Mode Theme** - Cyber-inspired gradient UI

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- Zustand (State Management)
- Axios
- React Router

## Installation

```bash
cd frontend
npm install
```

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── store/           # Zustand state management
│   ├── utils/           # Utilities and helpers
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Key Components

### Sidebar
- Navigation menu with active state indicators
- User profile section
- Premium upgrade prompt

### Dashboard
- Quick stats overview
- Mock interview CTA
- Live analysis preview
- Recent activity feed

### MockInterview
- AI avatar with animation
- Real-time chat interface
- Audio transcription display
- Live metrics sidebar
- Session progress tracking

### ResumeAnalyzer
- Resume file upload
- Score calculation with animations
- Section-by-section breakdown
- Skills extraction
- Strengths & improvements

### AIFeedback
- Performance overview
- Detailed metrics analysis
- Performance trend charts
- Personalized recommendations

### InterviewHistory
- Interview list with filtering
- Score badges with color coding
- Duration tracking
- View/Download/Delete actions

## API Integration

Update the `API_BASE_URL` in `src/utils/api.js` to point to your backend:

```javascript
const API_BASE_URL = 'http://your-backend-url/api';
```

## Customization

### Colors
Edit `frontend/tailwind.config.js` and `src/index.css` to customize the color scheme.

### Animations
Adjust animation durations and timing in component files.

### Fonts
Customize fonts in `tailwind.config.js`.

## License

MIT