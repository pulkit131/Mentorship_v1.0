# Mentorship Platform v1.0

**Website:** [https://mentorship-v1-0.vercel.app/](https://mentorship-v1-0.vercel.app/)

A comprehensive mentorship booking platform that connects students with experienced mentors for personalized learning sessions. The platform features payment-first booking, waitlist management, and subscription-based access to premium mentorship services.

## Features

### Core Functionality
- **User Authentication & Role Management** - Students and mentors with different access levels
- **Session Booking System** - Book 1-hour interactive sessions with mentors
- **Payment Integration** - Razorpay integration for subscription plans
- **Waitlist Management** - Join waitlists without payment, book sessions with subscription
- **Premium Plans** - Subscription-based access to mentorship services
- **Dashboard** - Track bookings, payments, and session history

### Subscription Plans
- **Beginner Techy Plan** - ₹599/month for early-stage learners
- **Placement-Focused Plan** - ₹799/month for job market preparation
- **Free Sessions** - 4 free sessions included with basic plan

### User Experience
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Scrolling** - Enhanced UX with scroll-to-premium-plans functionality
- **Real-time Validation** - Form validation and error handling
- **Interactive UI** - SweetAlert2 for user-friendly dialogs

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **SweetAlert2** - Beautiful, responsive, customizable dialogs

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Prisma ORM** - Database toolkit and ORM
- **MongoDB** - NoSQL database
- **Razorpay** - Payment gateway integration

### Development Tools
- **ESLint** - Code linting and formatting
- **Git** - Version control
- **Vercel** - Frontend deployment
- **Railway/Render** - Backend deployment

## 📁 Project Structure

```
Mentorship_v1.0/
├── backend/
│   ├── controllers/          # API route handlers
│   ├── middlewares/          # Custom middleware
│   ├── prisma/              # Database schema and migrations
│   ├── routes/              # API route definitions
│   ├── services/            # Business logic layer
│   └── index.js             # Server entry point
├── src/
│   ├── Components/          # Reusable UI components
│   ├── Dashboard/           # User dashboard components
│   ├── Home/               # Landing page components
│   ├── Mentors/            # Mentor-related components
│   ├── store/              # Zustand state management
│   ├── assets/             # Static assets and images
│   └── lib/                # Utility functions
├── public/                 # Public assets
└── package.json            # Dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Razorpay account for payments

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Mentorship_v1.0
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the backend directory:
   ```env
   DATABASE_URL="mongodb://localhost:XXXXX/mentorship"
   RAZORPAY_KEY_ID="your_razorpay_key"
   RAZORPAY_KEY_SECRET="your_razorpay_secret"
   PORT=5000
   ```

4. **Database Setup**
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   ```

5. **Start Development Servers**
   ```bash
   # Start backend server
   cd backend
   npm run dev
   
   # Start frontend (in new terminal)
   npm run dev
   ```

## Key Features Implementation

### Payment-First Booking System
- Users must subscribe to a plan before booking sessions
- Waitlist joining allowed without payment
- Automatic scroll to premium plans when payment required

### Database Schema
```prisma
model User {
  id             String   @id @default(auto()) @map("_id") @db.ObjectId
  name           String
  email          String   @unique
  role           Role     @default(USER)
  planType       PlanType @default(BASIC)
  planPrice      Int      @default(0)
  freeSessions   Int      @default(4)
  sessionCount   Int      @default(0)
  // ... other fields
}

model Session {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  userId    String   @db.ObjectId
  mentorId  String   @db.ObjectId
  timeSlot  DateTime
  status    String   @default("pending")
  // ... relationships
}

model Payment {
  id                 String   @id @default(auto()) @map("_id") @db.ObjectId
  status             String
  userEmail          String
  planName           String
  subscriptionStarts DateTime @default(now())
  subscriptionEnds   DateTime
  // ... other fields
}
```

### API Endpoints

#### User Management
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

#### Booking System
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `PUT /api/bookings/:id` - Update booking status

#### Payment Integration
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment signature
- `GET /api/payments` - Get payment history

#### Waitlist Management
- `POST /api/waitlist` - Join waitlist
- `GET /api/waitlist` - Get waitlist entries

## 🎯 Business Logic

### Payment Requirement Flow
1. User attempts to book session
2. Backend checks user's payment status
3. If no valid payment, returns `requiresPayment` flag
4. Frontend shows dialog and scrolls to premium plans
5. User subscribes to plan
6. User can now book sessions

### Waitlist vs Booking
- **Waitlist**: No payment required, join queue for mentor
- **Booking**: Payment required, immediate session booking

### Subscription Plans
- **Basic**: 4 free sessions, limited access
- **Beginner Techy**: ₹599/month, 4 live sessions, personalized guidance
- **Placement Focused**: ₹799/month, job market preparation, resume building

## Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Configure build settings
3. Set environment variables
4. Deploy automatically on push

### Backend (Railway/Render)
1. Connect GitHub repository
2. Set environment variables
3. Configure database connection
4. Deploy with auto-restart

## Security Features

- **Payment Verification** - Razorpay signature verification
- **Input Validation** - Server-side validation for all inputs
- **Error Handling** - Comprehensive error handling with custom flags
- **Role-based Access** - Different permissions for users and mentors

## Responsive Design

- **Mobile-first** approach with Tailwind CSS
- **Breakpoint responsive** design
- **Touch-friendly** interface
- **Cross-browser** compatibility

## Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Mentor profile creation
- [ ] Session booking with payment
- [ ] Waitlist joining without payment
- [ ] Payment integration with Razorpay
- [ ] Dashboard functionality
- [ ] Responsive design on mobile
- [ ] Error handling and validation


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Stack

- **Frontend Development** - React, Vite, Tailwind CSS
- **Backend Development** - Node.js, Express, Prisma
- **Database Design** - MongoDB with Prisma ORM
- **Payment Integration** - Razorpay API
- **Deployment** - Vercel (Frontend), Railway/Render (Backend)

## Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common issues

---

**Live:** [https://mentorship-v1-0.vercel.app/](https://mentorship-v1-0.vercel.app/)

*Built and developed by KalkiNI*