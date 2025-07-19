// Test script to verify payment requirement logic
const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

async function testPaymentRequirement() {
  const userId = '687aa9c09d4c09143117cfe1'; // The user ID from the error
  const mentorId = '6879344bc72123b632ceba27'; // The mentor ID from the error
  
  console.log('Testing payment requirement for booking...');
  console.log('User ID:', userId);
  console.log('Mentor ID:', mentorId);
  
  try {
    // First, let's check the user's current status
    console.log('\n1. Checking user status...');
    const userStatus = await axios.get(`${API_BASE}/users/debug/${userId}`);
    console.log('User status:', userStatus.data);
    
    // Now try to book a session
    console.log('\n2. Attempting to book a session...');
    const bookingData = {
      userId,
      mentorId,
      timeSlot: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Tomorrow
    };
    
    const bookingResponse = await axios.post(`${API_BASE}/bookings`, bookingData);
    console.log('Booking successful:', bookingResponse.data);
    
  } catch (error) {
    console.log('\n❌ Booking failed as expected');
    console.log('Status:', error.response?.status);
    console.log('Error:', error.response?.data);
    
    if (error.response?.data?.requiresPayment) {
      console.log('✅ Payment requirement correctly enforced!');
    } else {
      console.log('❌ Payment requirement not properly enforced');
    }
  }
}

// Run the test
testPaymentRequirement().catch(console.error); 