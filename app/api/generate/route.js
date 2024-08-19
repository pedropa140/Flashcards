import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai' // Import Google Generative AI

const systemPrompt = `
You are a flashcard creator. Take in text and create exactly 10 flashcards from it.
Each flashcard should have a front and back, both one sentence long.
Return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

export async function POST(req) {
    console.log("first print " + req);
    console.log("second print " +req.body);
    const client = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GENAI_API_KEY) // Initialize Google Generative AI client
    const data = await req.text();
    console.log("data " + data);
    // const completion = await client.chat.generate({
    //   messages: [
    //     { role: 'system', content: systemPrompt },
    //     { role: 'user', content: data },
    //   ],
    //   model: 'gemini-1.5-flash', // Use the appropriate Google model
    // })
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(systemPrompt+ " " +  data);
    const response = await result.response;
    console.log("response " + response.text);
    

    // Parse the JSON response from the Google Generative AI API
    const flashcards = JSON.parse(response.text)

    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards);
}
