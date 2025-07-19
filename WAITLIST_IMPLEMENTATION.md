# Waitlist Implementation

## Overview

This implementation allows users to join waitlists without making a payment, but requires payment before booking actual sessions. The system automatically processes waitlist entries when users make payments.

## Key Features

### 1. Waitlist Without Payment
- Users can join waitlists for mentors without making any payment
- Waitlist entries are stored in the `WaitlistEntry` table
- Users can join multiple waitlists simultaneously

### 2. Payment Required for Booking
- Users must make a payment before booking actual sessions
- The system checks for valid payment records before allowing bookings
- Payment verification includes checking if the payment is still valid (not expired)

### 3. Automatic Waitlist Processing
- When a user makes a payment, their waitlist entries are automatically processed
- Users are assigned to mentors if slots are available
- Users remain on waitlist if mentors are still full

## Database Schema

### WaitlistEntry Model
```prisma
model WaitlistEntry {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  userId    String   @db.ObjectId
  mentorId  String   @db.ObjectId
  createdAt DateTime @default(now())

  user   User @relation(fields: [userId], references: [id])
  mentor User @relation("MentorWaitlist", fields: [mentorId], references: [id])
}
```

### Payment Model
```prisma
model Payment {
  id                 String   @id @default(auto()) @map("_id") @db.ObjectId
  status             String
  userEmail          String
  planName           String
  subscriptionStarts DateTime @default(now())
  subscriptionEnds   DateTime
  createdAt          DateTime @default(now())
}
```

## API Endpoints

### Waitlist Management
- `POST /api/waitlist/add` - Add user to waitlist
- `POST /api/waitlist/remove` - Remove user from waitlist
- `GET /api/waitlist/user/:userId` - Get user's waitlist entries
- `GET /api/waitlist/mentor/:mentorId` - Get mentor's waitlist entries

### Payment Processing
- `POST /api/payments/verify` - Verify payment and process waitlist entries

## Frontend Components

### 1. Mentorlist Component
- Shows mentor availability status
- Provides "Join Waitlist" button for full mentors
- Shows waitlist status for each mentor

### 2. WaitlistStatus Component
- Displays user's current waitlist entries
- Allows users to remove themselves from waitlists
- Shows helpful tips about payment benefits

### 3. Payment Store
- Handles payment verification
- Processes waitlist results after payment
- Shows notifications for waitlist assignments

## Business Logic

### Booking Flow
1. User attempts to book a session
2. System checks if user has valid payment
3. If no payment, user is redirected to payment page
4. If payment exists, booking proceeds normally

### Waitlist Flow
1. User joins waitlist for a mentor
2. No payment required for waitlist entry
3. When user makes payment, waitlist entries are processed
4. User is assigned to mentors if slots are available

### Payment Processing
1. Payment is verified with Razorpay
2. Payment record is saved to database
3. User's plan is updated
4. Waitlist entries are processed automatically
5. User receives notifications about assignments

## Usage Examples

### Joining Waitlist
```javascript
const { addToWaitlist } = useWaitlistStore();
await addToWaitlist(userId, mentorId);
```

### Checking Waitlist Status
```javascript
const { userWaitlistEntries } = useWaitlistStore();
const isOnWaitlist = userWaitlistEntries.some(entry => 
  entry.mentorId === mentorId
);
```

### Payment with Waitlist Processing
```javascript
const { verifyPayment } = usePaymentStore();
const result = await verifyPayment(paymentData);
// Waitlist processing happens automatically
```

## Error Handling

- Invalid mentor/user IDs return 404
- Duplicate waitlist entries are handled gracefully
- Payment verification failures are properly handled
- Network errors show user-friendly messages

## Security Considerations

- Payment verification uses cryptographic signatures
- User authentication is required for all operations
- Database transactions ensure data consistency
- Input validation prevents injection attacks 