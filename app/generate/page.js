"use client";

import { useState, useEffect } from "react";
import {
  Container, TextField, Button, Typography, Box, Grid, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import './styles.css'; // Import the custom styles for the flip effect
import { db } from '@/firebase';  // Import the Firestore
import { collection, addDoc, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "@clerk/nextjs"; // Import Clerk's useAuth

export default function Generate() {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]); // Track the flip state for each card
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [openShowSetsDialog, setOpenShowSetsDialog] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [selectedSet, setSelectedSet] = useState("");
  const [flashcardSets, setFlashcardSets] = useState([]);
  const { userId } = useAuth(); // Get the logged-in user's ID

  useEffect(() => {
    if (userId) {
      const fetchFlashcardSets = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, `users/${userId}/flashcardSets`));
          const sets = [];
          querySnapshot.forEach((doc) => {
            sets.push({ id: doc.id, ...doc.data() });
          });
          setFlashcardSets(sets);
        } catch (e) {
          console.error("Error fetching flashcard sets: ", e);
        }
      };

      fetchFlashcardSets();
    }
  }, [userId]);

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

  const handleSave = async () => {
    if (!collectionName.trim()) {
      alert("Please enter a collection name.");
      return;
    }

    if (!userId) {
      alert("You must be logged in to save flashcards.");
      return;
    }

    try {
      const setRef = doc(db, `users/${userId}/flashcardSets`, collectionName);
      await setDoc(setRef, {
        flashcards: flashcards,
        createdAt: new Date()
      });
      console.log("Flashcard collection saved successfully.");
      setOpenSaveDialog(false);
      setCollectionName(""); // Clear the collection name input

      // Refresh flashcard sets list
      const querySnapshot = await getDocs(collection(db, `users/${userId}/flashcardSets`));
      const sets = [];
      querySnapshot.forEach((doc) => {
        sets.push({ id: doc.id, ...doc.data() });
      });
      setFlashcardSets(sets);

    } catch (e) {
      console.error("Error saving flashcard collection: ", e);
    }
  };

  const handleShowSets = async () => {
    if (selectedSet) {
      try {
        const docRef = doc(db, `users/${userId}/flashcardSets`, selectedSet);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFlashcards(docSnap.data().flashcards);
          setFlipped(new Array(docSnap.data().flashcards.length).fill(false)); // Initialize flip state for all cards
          setOpenShowSetsDialog(false);
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.error("Error fetching flashcard set: ", e);
      }
    }
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
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => setOpenShowSetsDialog(true)}
          >
            Show Sets
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => setOpenSaveDialog(true)}
          >
            Save Flashcards
          </Button>
        </Box>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant='h5' component='h2' gutterBottom>
            Generated Flashcards
          </Typography>
          <Grid container spacing={3}>
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
                          {/* Removed the word "Front" */}
                          <Typography>{flashcard.front}</Typography>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="flashcard-back">
                      <Card>
                        <CardContent>
                          {/* Removed the word "Back" */}
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


      <Dialog open={openSaveDialog} onClose={() => setOpenSaveDialog(false)}>
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Collection Name"
            type="text"
            fullWidth
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSaveDialog(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openShowSetsDialog} onClose={() => setOpenShowSetsDialog(false)} fullWidth maxWidth="md">
        <DialogTitle>Select Flashcard Set</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Select a Flashcard Set</InputLabel>
            <Select
              value={selectedSet}
              onChange={(e) => setSelectedSet(e.target.value)}
              fullWidth
              displayEmpty
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    width: 250,
                  },
                },
              }}
            >
              <MenuItem value="" disabled>Select a flashcard set</MenuItem>
              {flashcardSets.map((set) => (
                <MenuItem key={set.id} value={set.id}>
                  {set.collectionName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenShowSetsDialog(false)}>Cancel</Button>
          <Button onClick={handleShowSets}>Select</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
