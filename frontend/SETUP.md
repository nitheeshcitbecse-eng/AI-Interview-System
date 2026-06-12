# SETUP INSTRUCTIONS

## Quick Start Guide

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to:
```
http://localhost:5173
```

### Backend Configuration

1. Update the API base URL in `src/utils/api.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url/api';
```

2. Make sure your backend server is running on the specified port.

### Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Project Features

### 1. Dashboard
- Overview of your interview statistics
- Quick access to main features
- Real-time analysis preview
- Recent activity feed

### 2. Mock Interview
- AI-powered interview simulation
- Real-time feedback metrics
- Audio/Video recording
- Chat-based Q&A
- Performance tracking

### 3. Resume Analyzer
- Upload and analyze resumes
- Get detailed feedback on structure
- Skills extraction
- Improvement suggestions
- Score-based evaluation

### 4. AI Feedback
- Comprehensive performance analysis
- Detailed metric breakdown
- Performance trends over time
- Personalized recommendations
- Strengths and areas to improve

### 5. Interview History
- View all past interviews
- Filter by type or date
- Download interview reports
- Track improvement over time

### 6. Settings
- Customize appearance (theme, language)
- Audio/Video preferences
- Notification settings
- Privacy and security options
- Profile management

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── GradientCard.jsx
│   │   ├── AnimatedMetricCircle.jsx
│   │   └── AnimatedChart.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── MockInterview.jsx
│   │   ├── ResumeAnalyzer.jsx
│   │   ├── AIFeedback.jsx
│   │   ├── InterviewHistory.jsx
│   │   ├── Settings.jsx
│   │   └── Login.jsx
│   ├── store/
│   │   ├── authStore.js
│   │   └── interviewStore.js
│   ├── utils/
│   │   ├── api.js
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Key Technologies

- **React 18**: Modern UI library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Advanced animations
- **Recharts**: Data visualization
- **Zustand**: Simple state management
- **React Router**: Client-side routing
- **Axios**: HTTP client

## API Endpoints Expected

### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `POST /auth/logout` - User logout

### Interviews
- `POST /interview/start` - Start new interview
- `POST /interview/:id/end` - End interview
- `GET /interview/history` - Get interview history
- `GET /interview/:id` - Get interview details

### Analysis
- `POST /analysis/audio` - Analyze audio recording
- `POST /analysis/resume` - Analyze resume
- `GET /analysis/live/:id` - Get live analysis metrics
- `GET /analysis/feedback/:id` - Get detailed feedback

## Customization Guide

### Changing Colors
1. Edit `tailwind.config.js` for theme colors
2. Update gradient definitions in `src/index.css`
3. Modify COLORS constant in `src/utils/constants.js`

### Adding New Pages
1. Create new file in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation in `src/components/Sidebar.jsx`

### Modifying Animations
- Edit component `variants` objects
- Adjust transition durations
- Modify Framer Motion properties

## Troubleshooting

### Port Already in Use
```bash
# Use a different port
npm run dev -- --port 3000
```

### CORS Issues
Make sure your backend allows requests from `http://localhost:5173`

### Module Not Found
Delete `node_modules` and `package-lock.json`, then reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Update API endpoints in `src/utils/api.js`
2. Implement actual authentication
3. Connect to real backend services
4. Add WebSocket for real-time features
5. Implement file upload functionality
6. Add user testing and feedback

## Support

For issues or questions, please check the documentation or create an issue in the repository.
