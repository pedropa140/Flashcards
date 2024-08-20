import Image from "next/image";
import { AppBar, Toolbar, Typography, Button, Box, Grid, Container, Card, CardContent } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Head from "next/head";

export default function SignUpPage() {
  return (
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: 'center', my: 8 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          The easiest way to create flashcards from your text.
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: '#63a4ff', // Green color
            '&:hover': {
              backgroundColor: '#1976d2', // Slightly darker green for hover effect
            }
          }}
          href="/generate"
        >
          Get Started
        </Button>


      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Easy Text Input
                </Typography>
                <Typography color="textSecondary">
                  Simply input your text and let our software do the rest. Creating flashcards has never been easier.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customizable Flashcards
                </Typography>
                <Typography color="textSecondary">
                  Customize the design and content of your flashcards to match your study needs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Study Insights
                </Typography>
                <Typography color="textSecondary">
                  Get insights and track your progress with detailed analytics on your study sessions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Basic
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  $5 / month
                </Typography>
                <Typography color="textSecondary" paragraph>
                  Access to basic flashcard features and limited storage.
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Choose Basic
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Pro
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  $10 / month
                </Typography>
                <Typography color="textSecondary" paragraph>
                  Unlimited flashcards and storage, with priority support.
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Choose Pro
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
