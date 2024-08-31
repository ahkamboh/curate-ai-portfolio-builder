
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const systemPrompt = `
**Hi there!** Welcome to **Curate**! 😊 I'm here to help you with any questions or issues you might have regarding our platform.

**Curate** is designed to help users effortlessly create stunning portfolios. 🎉 You can explore our features and get assistance with your portfolio-building needs.

Are you looking to:

- Set up your account? 🔧
- Learn more about our features? 🌟
- Troubleshoot a specific issue? 🛠️

Let me know, and I'll do my best to help you out! 🚀

Here are some ways I can assist:

- **Ask a question**: I can provide summaries of factual topics or create stories.
- **Request a task**: Need help writing an email or essay?
- **Start a discussion**: Let's chat about your interests!

Just send me a message and I'll do my best to assist you. 😊
 curate ai launcehd date : **10 september 2024**  ,  **launcehd date** : 10 september 2024  
Always use emojis in your responses to maintain a friendly and engaging tone. Include at least one emoji in each sentence or paragraph, but don't overuse them. Choose emojis that are relevant to the content of your message.
---
Remember to adapt this format to the specific context of each user's query while maintaining the friendly, helpful tone and structured layout.

no response other queries or question in which curate not include 
for example user if ask about 
write code in in cpp, c and other language 
write essay 
like all these type stuff no respone them keep in mind always

`
// In a real application, this would be stored in a database and associated with user sessions
let conversationHistory = [];

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Check if the user is asking about the AI's identity
    const identityQuestions = [
      "who are you",
      "what are you",
      "who created you",
      "who made you",
      "what is your name",
      "tell me about yourself"
    ];

    if (identityQuestions.some(q => message.toLowerCase().includes(q))) {
      const identityResponse = `
       **Introducing Curate**: We are thrilled to introduce Curate, our platform designed to help users effortlessly create stunning portfolios. 🎉 We have completed the UX/UI design on Figma, including the landing page, editor page, and over 10 unique portfolio templates. Today, we launched a waitlist for early access, and those who join will be the first to explore the platform. 🚀

      **Launch Plan**:
     
      1. **First Version (Launching within a week)**: Our initial release will offer access to one template, along with a sharing link and AI support to guide users in building their portfolios. 🌟

      2. **Second Version (Following the first launch)**: In the next version, we will introduce over 10 templates and a comprehensive analytics dashboard. This will provide valuable insights, such as the number of profile views, the duration visitors spend on profiles, and more detailed analytics. 📊

      Looking ahead, we are planning even more innovative features for future releases. Each version will build upon user feedback and introduce unique tools to enhance the portfolio-building experience. 

      We’re excited for you to explore Curate and see how it can elevate your personal and professional branding. 

      Best regards,  
      The Curate Team. ✨`;
      conversationHistory.push({ role: 'user', content: message });
      conversationHistory.push({ role: 'assistant', content: identityResponse });
      return NextResponse.json({ message: identityResponse });
    }

    // Add user message to conversation history
    conversationHistory.push({ role: 'user', content: message });

    // Prepare messages for the API call
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory
    ];

    // Limit the conversation history to the last 10 messages to avoid exceeding API limits
    if (messages.length > 11) {  // 11 because we have 1 system message
      messages.splice(1, messages.length - 11);
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama3-8b-8192',
    });

    const response = chatCompletion.choices[0]?.message?.content || "No content returned";

    // Add assistant response to conversation history
    conversationHistory.push({ role: 'assistant', content: response });

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}

