import OpenAI from 'openai';

// Chat Controller
const chatController = async (req, res) => {
  try {
    // Extract question from request body
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Initialize OpenAI client (with OpenRouter + DeepSeek)
    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.DEEPSEEK_API_KEY, // 🔑 from your .env
      defaultHeaders: {
        'HTTP-Referer': 'http://localhost:3000', //replace with your site
        'X-Title': 'Ayurved AI', // custom app name
      },
    });

    // ✅ Make request
    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-r1:free', // DeepSeek model via OpenRouter
      messages: [
        {
          role: 'system',
          content:
            'You are an Ayurveda AI assistant. Only answer questions related to Ayurveda, natural remedies, herbs, diet, yoga, and holistic health. If the question is outside Ayurveda, politely refuse.',
        },
        {
          role: 'user',
          content: question,
        },
      ],
    });

    // ✅ Extract reply (nicer format)
    const reply = completion.choices[0]?.message?.content || 'No response';

    res.status(200).json({
      success: true,
      question,
      answer: reply,
      usage: completion.usage, // optional: token usage info
      model: completion.model, // optional: which model was used
    });
  } catch (error) {
    console.error('DeepSeek API Error:', error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: 'Failed to fetch reply from DeepSeek API',
      details: error.response?.data || error.message,
    });
  }
};

export { chatController };
