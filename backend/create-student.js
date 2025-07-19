import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/users';

const createStudents = async () => {
  for (let i = 1; i <= 25; i++) {
    const studentData = {
      name: `student${i}`,
      email: `student${i}@gmail.com`,
      profileImage: `https://example.com/avatar${i}.png`,
      role: 'USER',
      planType: 'BASIC', // or 'BEGINNER_TECHY' or 'PLACEMENT_FOCUSED'
      planPrice: 0
    };

    try {
      const response = await axios.post(BASE_URL, studentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(`✅ Created: student${i}`, response.data);
    } catch (error) {
      console.error(`❌ Failed to create student${i}:`, error.response?.data || error.message);
    }
  }
};

createStudents();
