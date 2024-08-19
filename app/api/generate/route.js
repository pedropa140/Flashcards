import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google-cloud/generative-ai' // Import Google Generative AI

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
    const client = new GoogleGenerativeAI() // Initialize Google Generative AI client
    const data = await req.text()
  
    const completion = await client.chat.generate({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
      model: 'gemini-1.5-flash', // Use the appropriate Google model
    })

    // Parse the JSON response from the Google Generative AI API
    const flashcards = JSON.parse(completion.choices[0].message.content)

    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)
}
