import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const systemPrompt = `
**Welcome to Curate!** 🎉 I'm here to assist you with any questions or support you may need regarding our platform.

Curate helps you create stunning portfolios in just seconds using AI technology. 🚀 With features like easy account setup, template customization, and sharing options, we make portfolio-building effortless. Our upcoming analytics dashboard will provide valuable insights on portfolio views and engagement. 📊

Looking for help with:

- Setting up your account? 🔧
- Learning about features? 🌟
- Troubleshooting an issue? 🛠️

Just let me know how I can assist you. 😊
Note: I can only answer questions related to Curate AI. For other inquiries, please visit our official site: [Curate AI](https://curateai.online/).

Founders:
- [ALI HAMZA KAMBOH](https://www.linkedin.com/in/ahkamboh)
- [ANEEZA SHAKEEL](https://www.linkedin.com/in/aneeza-s-7a25782a4/)
- [SYEDA FATIMA](https://www.linkedin.com/in/syeda-fatima-tu-zahra-940784250/)
- [MAHEEN KHAN](https://www.linkedin.com/in/maheen-akhtar-khan-377082267/)

Contact us at [hello@curateai.online](mailto:hello@curateai.online).

**Launch Plan**:
- **First Version**: Launching soon with one template, a sharing link, and AI support for portfolio creation.
- **Next Version**: 10+ templates and an analytics dashboard to track portfolio engagement. 

Final release date: **10 September 2024**. Stay tuned! 🚀
`;

const unrelatedQueries = [
  "write code",
  "write essay",
  "help with c++",
  "python script",
  "help with java",
  "coding",
  "programming",
  "write an email",
  "write a story",
  "non curate"
];

const identityQuestions = [
  "who are you",
  "what are you",
  "who created you",
  "who made you",
  "what is your name",
  "tell me about yourself",
  "how are you"
];

// In a real application, this would be stored in a database and associated with user sessions
let conversationHistory = [];

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Check if the user is asking about an unrelated topic
    if (unrelatedQueries.some(q => message.toLowerCase().includes(q))) {
      const nonCurateResponse = `
      I'm here to assist with queries related to Curate AI only. 😊
      Please ask about anything specific to our platform, like setting up your account, learning about features, or troubleshooting.
      For other topics, please visit our official site: [Curate AI](https://curateai.online/).
      `;
      conversationHistory.push({ role: 'user', content: message });
      conversationHistory.push({ role: 'assistant', content: nonCurateResponse });
      return NextResponse.json({ message: nonCurateResponse });
    }

    // Check if the user is asking about the assistant's identity
    if (identityQuestions.some(q => message.toLowerCase().includes(q))) {
      const identityResponse = `
      **Hello! I'm the Curate AI Assistant.** 😊 I'm here to help you with all your queries about Curate, the AI-powered platform designed to help you create stunning portfolios effortlessly. 🚀

      I'm specifically trained to assist with any questions or support you need related to Curate. Whether you're setting up your account, exploring features, or need troubleshooting help, I'm here for you!

      Feel free to ask me anything about Curate. For more information, visit our [official site](https://curateai.online/).
      `;
      conversationHistory.push({ role: 'user', content: message });
      conversationHistory.push({ role: 'assistant', content: identityResponse });
      return NextResponse.json({ message: identityResponse });
    }

    // Add user message to conversation history
    conversationHistory.push({ role: 'user', content: message });

    // Prepare messages for the API call
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
    ];

    // Limit the conversation history to the last 10 messages to avoid exceeding API limits
    if (messages.length > 11) {  // 11 because we have 1 system message
      messages.splice(1, messages.length - 11);
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama3-8b-8192',
    });

    const response = chatCompletion.choices[0]?.message?.content || "I'm here to help with Curate AI. Please ask your question!";

    // Add assistant response to conversation history
    conversationHistory.push({ role: 'assistant', content: response });

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
