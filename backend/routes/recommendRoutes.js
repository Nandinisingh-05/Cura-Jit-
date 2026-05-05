const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const specialists = [
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Pediatrician',
  'General Physician',
  'Psychiatrist',
  'Orthopedic'
];

// Sample data for doctors
const doctorsData = [
  { id: 1, name: 'Dr. Sarah Smith', specialization: 'Cardiologist', experience: '12 years', rating: 4.9, fee: 800 },
  { id: 2, name: 'Dr. James Wilson', specialization: 'Dermatologist', experience: '8 years', rating: 4.8, fee: 600 },
  { id: 3, name: 'Dr. Michael Chen', specialization: 'Neurologist', experience: '15 years', rating: 4.7, fee: 1200 },
  { id: 4, name: 'Dr. Emily Brown', specialization: 'Pediatrician', experience: '10 years', rating: 4.9, fee: 500 },
  { id: 5, name: 'Dr. Lisa Ray', specialization: 'General Physician', experience: '6 years', rating: 4.8, fee: 400 }
];

router.post('/recommend', async (req, res) => {
  const { symptoms } = req.body;

  // Debug Logs
  console.log('--- Recommendation Request ---');
  console.log('Symptoms received:', symptoms || 'None');

  if (!symptoms) {
    return res.status(400).json({ error: 'Symptoms are required' });
  }

  let specialist = 'General Physician'; // Default Fallback
  let usedAI = false;

  try {
    console.log('Calling OpenAI for symptom analysis...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a medical assistant. Based on the symptoms, return ONLY the most relevant medical specialist from the list. Do not explain anything. List: [Cardiologist, Dermatologist, Neurologist, Pediatrician, General Physician, Psychiatrist, Orthopedic]"
        },
        {
          role: "user",
          content: `User symptoms: ${symptoms}`
        }
      ],
      temperature: 0,
      max_tokens: 20
    });

    const aiResponse = completion.choices[0].message.content.trim();
    console.log('AI Response:', aiResponse);

    // Validate if the AI response is in our allowed list
    const matchedSpecialist = specialists.find(s => 
      aiResponse.toLowerCase().includes(s.toLowerCase())
    );

    if (matchedSpecialist) {
      specialist = matchedSpecialist;
      usedAI = true;
      console.log('AI detected specialist:', specialist);
    } else {
      console.log('AI returned invalid specialist, falling back to keyword logic...');
    }

  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    console.log('Falling back to keyword-based logic...');
  }

  // Fallback keyword logic if AI fails or returns invalid specialist
  if (!usedAI) {
    const input = symptoms.toLowerCase();
    const mappings = [
      { keywords: ['heart', 'chest', 'pain', 'palpitation', 'breath', 'hurting'], specialist: 'Cardiologist' },
      { keywords: ['skin', 'rash', 'itching', 'acne', 'allergy', 'redness'], specialist: 'Dermatologist' },
      { keywords: ['head', 'brain', 'nerve', 'headache', 'migraine', 'dizzy'], specialist: 'Neurologist' },
      { keywords: ['child', 'baby', 'kid', 'infant', 'growth', 'pediatric'], specialist: 'Pediatrician' },
      { keywords: ['bone', 'joint', 'fracture', 'muscle', 'back', 'ortho'], specialist: 'Orthopedic' },
      { keywords: ['mental', 'depressed', 'anxiety', 'stress', 'mind', 'mood'], specialist: 'Psychiatrist' }
    ];

    for (const map of mappings) {
      if (map.keywords.some(keyword => input.includes(keyword))) {
        specialist = map.specialist;
        break;
      }
    }
    console.log('Detected Specialist (Keyword Logic):', specialist);
  }

  // Exact specialization filtering (case-insensitive)
  const filteredDoctors = doctorsData.filter(d =>
    d.specialization.toLowerCase() === specialist.toLowerCase()
  );

  console.log(`Final Specialist: ${specialist}`);
  console.log(`Filtered Doctors Count: ${filteredDoctors.length}`);
  console.log('------------------------------');

  res.json({
    specialist,
    doctors: filteredDoctors
  });
});

module.exports = router;
