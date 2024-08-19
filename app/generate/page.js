"use client";

import { useState } from "react";
import { Container, TextField, Button, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import './styles.css'; // Import the custom styles for the flip effect

export default function Generate() {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]); // Track the flip state for each card

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setFlashcards(data.flashcards);
      setFlipped(new Array(data.flashcards.length).fill(false)); // Initialize flip state for all cards
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

  const handleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  return (
    <Container maxWidth='md'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Generate Flashcards
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label='Enter text'
          fullWidth
          multiline
          rows={4}
          variant='outlined'
          sx={{ mb: 2 }}
        />
        <Button variant='contained' color='primary' onClick={handleSubmit} fullWidth>
          Generate Flashcards
        </Button>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant='h5' component='h2' gutterBottom>
            Generated Flashcards
          </Typography>
          <Grid container spacing={2}> {/* Increased spacing to 3 for more room */}
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <div
                  className={`flashcard ${flipped[index] ? 'flipped' : ''}`}
                  onClick={() => handleFlip(index)}
                >
                  <div className="flashcard-inner">
                    <div className="flashcard-front">
                      <Card>
                        <CardContent>
                          <Typography variant="h6">Front:</Typography>
                          <Typography>{flashcard.front}</Typography>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="flashcard-back">
                      <Card>
                        <CardContent>
                          <Typography variant="h6">Back:</Typography>
                          <Typography>{flashcard.back}</Typography>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
