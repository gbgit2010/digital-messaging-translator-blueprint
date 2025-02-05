const axios = require('axios');

// Replace with your actual API key
const apiKey = 'AIzaSyAu6pLPCAdcuRS5jsyU8uvxbnjBBSJ-sLU';
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

const data = {
  contents: [
    {
      parts: [
        { text: "Explain how AI works" }
      ]
    }
  ]
};

async function generateContent() {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response data:', JSON.stringify(response.data));
  } catch (error) {
    console.error('Error generating content:', error.response ? error.response.data : error.message);
  }
}

// Run the function
generateContent();
