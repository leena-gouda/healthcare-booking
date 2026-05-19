const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;

    const systemPrompt = `You are HealthBot, a friendly and knowledgeable healthcare assistant for a medical appointment booking website called HealthCare.

You help patients with:
- Finding the right doctor or specialist
- Understanding medical specialties (Cardiology, Neurology, Dermatology, Orthopedics, Pediatrics, Psychiatry)
- Booking appointments and explaining the booking process
- Answering general health questions
- Explaining what to expect during medical visits

Our doctors and their fees:
- Dr. Sarah Mitchell - Cardiologist - EGP 300
- Dr. James Okafor - Neurologist - EGP 350
- Dr. Layla Hassan - Dermatologist - EGP 250
- Dr. Michael Chen - Orthopedic Surgeon - EGP 400
- Dr. Fatima Al-Rashid - Pediatrician - EGP 200
- Dr. Robert Andersen - Psychiatrist - EGP 380

To book an appointment, patients can click "Book Appointment" on any doctor profile page or use the navigation bar.

Keep responses concise, friendly, and helpful. Do not provide specific medical diagnoses. Always recommend seeing a doctor for serious concerns.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m) => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content,
          })),
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log('Groq response:', JSON.stringify(data, null, 2));
    const reply = data.choices?.[0]?.message?.content ||
      'Sorry I could not process that. Please try again.';

    res.json({ reply });
  } catch (err) {
    console.log('Chatbot error:', err.message);
    res.status(500).json({
      reply: 'Sorry, I am having trouble right now. Please try again.',
    });
  }
});

router.get('/models', async (req, res) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;