"use client";

import { useState, useEffect } from "react";
import {
  Container, TextField, Button, Typography, Box, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import Slider from "react-slick";
import './styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from '@/firebase';
import { collection, addDoc, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "@clerk/nextjs";

export default function Generate() {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [openShowSetsDialog, setOpenShowSetsDialog] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [selectedSet, setSelectedSet] = useState("");
  const [flashcardSets, setFlashcardSets] = useState([]);
  const { userId } = useAuth();

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
      setFlipped(new Array(data.flashcards.length).fill(false));
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
        createdAt: new Date(),
        collectionName: collectionName // Save the collection name
      });
      console.log("Flashcard collection saved successfully.");
      setOpenSaveDialog(false);
      setCollectionName("");

      // Update the list of flashcard sets
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
          setFlipped(new Array(docSnap.data().flashcards.length).fill(false));
          setOpenShowSetsDialog(false);
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.error("Error fetching flashcard set: ", e);
      }
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Container maxWidth='md'>
      <Box sx={{ my: 4, p: 3, borderRadius: 2, boxShadow: 3, backgroundColor: '#b8c0ff' }}>
        <Typography variant='h4' component='h1' gutterBottom sx={{ mb: 2, fontFamily:`'FreeMono', monospace'`, color: '#4771cc' }}>
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
          sx={{ mb: 2, backgroundColor: '#b8c0ff', '& .MuiInputBase-input': { color: 'black' } }}
        />

        <Button variant='contained' color='primary' onClick={handleSubmit} fullWidth sx={{fontFamily:`'FreeMono', monospace`, backgroundColor: '#c8b6ff', '&:hover': {backgroundColor:'#E7C6FF'}, mb: 2 }}>
          Generate Flashcards
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => setOpenShowSetsDialog(true)}
            sx={{
              fontFamily:`'FreeMono', monospace`,
              flex: 1,
              backgroundColor: '#c8b6ff', // Set the background color
              '&:hover': {
                backgroundColor: '#E7C6FF', // Darker shade on hover
              },
            }}
          >
            Show Sets
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => setOpenSaveDialog(true)}
            sx={{
              fontFamily:`'FreeMono', monospace`,
              flex: 1,
              backgroundColor: '#c8b6ff', // Set the background color
              '&:hover': {
                backgroundColor: '#E7C6FF', // Darker shade on hover
              },
            }}
          >
            Save Flashcards
          </Button>
        </Box>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant='h5' component='h2' sx={{ fontFamily:`'FreeMono', monospace`, color: '#4771cc'}} gutterBottom>
            Generated Flashcards
          </Typography>
          <Slider {...sliderSettings}>
            {flashcards.map((flashcard, index) => (
              <div key={index}>
                <div
                  className={`flashcard ${flipped[index] ? 'flipped' : ''}`}
                  onClick={() => handleFlip(index)}
                >
                  <div className="flashcard-inner">
                    <div className="flashcard-front">
                      <Card
                        sx={{
                          fontFamily:`'FreeMono', monospace`, color: '#4771cc',
                          height: '200px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#b8c0ff',
                          boxShadow: 3,
                          borderRadius: 2
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" align="center">
                            {flashcard.front}
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="flashcard-back">
                      <Card
                        sx={{
                          fontFamily:`'FreeMono', monospace`, color: '#4771cc',
                          height: '200px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#B8C0FF',
                          boxShadow: 3,
                          borderRadius: 2
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" align="center">
                            {flashcard.back}
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
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
