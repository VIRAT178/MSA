# Malwa Sports Academy - Backend Setup

## Quick Start for Local Development

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- SMTP service (Gmail, SendGrid, etc.)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`

4. Start the development server:
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

### Environment Variables

Copy `.env.example` and fill in these essential variables:

- **MONGODB_URI**: MongoDB connection string
- **JWT_SECRET**: Secret key for JWT tokens
- **SMTP_HOST/USER/PASS**: Email service credentials
- **ADMIN_EMAIL**: Email to receive inquiry leads
- **CLIENT_URL**: Frontend URL (http://localhost:3000 for development)

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

#### Inquiries
- `POST /api/inquiries` - Submit inquiry (sends emails to admin & user)
- `GET /api/inquiries` - Get all inquiries

#### Users
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

#### Contacts
- `POST /api/contacts` - Submit contact form

### Features

✅ User authentication with JWT
✅ Email notifications (admin leads + user confirmations)
✅ Express validation
✅ CORS configured
✅ Rate limiting
✅ Security headers with Helmet
✅ Error handling middleware

### Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) for production deployment to Render.

### Scripts

- `npm start` - Run production server
- `npm run dev` - Run development server with nodemon
- `npm run lint` - Run ESLint

### Troubleshooting

**Port already in use:**
```bash
PORT=5001 npm run dev
```

**MongoDB connection failed:**
- Check MONGODB_URI format
- Verify network access in MongoDB Atlas
- Ensure firewall allows connection

**Emails not sending:**
- Verify SMTP credentials
- Check email logs in Render dashboard
- For Gmail, use App Password, not regular password
