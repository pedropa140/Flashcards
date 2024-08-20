import Image from "next/image";
import { AppBar, Toolbar, Typography, Button, Box, Grid, Container, Card, CardContent } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Head from "next/head";

export default function SignUpPage() {
  return (
    <Container maxWidth="lg">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="fixed" sx={{ width: '100%', backgroundColor: '#3561c0'}}>
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

      <Box sx={{ marginTop: '100px' }}>
        <Box sx={{ textAlign: 'center', my: 1 }}>
          <Typography variant="h2" sx={{ fontFamily:`'FreeMono', monospace'`, color: '#4771cc'}} gutterBottom>
            Welcome to Flashcard SaaS
          </Typography>
          <Typography variant="h5" color="textSecondary" sx={{ fontFamily:`'FreeMono', monospace`, color: '#4771cc'}} paragraph>
            The easiest way to create flashcards from your text.
          </Typography>
          <Button
            variant="contained"
            sx={{
            fontFamily:`'FreeMono', monospace`,
              mt: 2,
              backgroundColor: '#c8b6ff',
              '&:hover': {
                backgroundColor: '#e7c6ff',
              }
            }}
            href="/generate"
          >
            Get Started
          </Button>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ fontFamily:`'FreeMono', monospace`, color: '#4771cc'}}>
            Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined" sx={{ height: '100%', borderRadius: '15px', backgroundColor:'#b8c0ff' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontFamily:`'FreeMono', monospace`, color: '#4771cc'}} gutterBottom>
                    Easy Text Input
                  </Typography>
                  <Typography color="textSecondary" sx={{ fontFamily:`'FreeMono', monospace`, color: '#4771cc'}}>
                    Simply input your text and let our software do the rest. Creating flashcards has never been easier.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined" sx={{ height: '100%', borderRadius: '15px',backgroundColor:'#b8c0ff' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontFamily:`'FreeMono', monospace`, color: '#4771cc'}} gutterBottom>
                    Stored For Later
                  </Typography>
                  <Typography color="textSecondary" sx={{ fontFamily:`'FreeMono', monospace`, color: '#4771cc'}}>
                    Easily reference your cards whenever you want. Save your cards for future use.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined" sx={{ height: '100%', borderRadius: '15px',backgroundColor:'#b8c0ff' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontFamily:`'FreeMono', monospace`, color: '#4771cc'}} gutterBottom>
                    Beautiful motions
                  </Typography>
                  <Typography color="textSecondary" sx={{ fontFamily:`'FreeMono', monospace`, color: '#4771cc'}}>
                    Flip your flashcards to see both sides for better memory retention.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 6, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontFamily:`'FreeMono', monospace`, color: '#4771cc'}} gutterBottom>
            Pricing
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', borderRadius: '15px', backgroundColor:'#b8c0ff' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ fontFamily:`'FreeMono', monospace`,height: '100%', borderRadius: '15px', color: '#4771cc' }}>
                    Basic
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontFamily:`'FreeMono', monospace`, color: '#4771cc'}} gutterBottom>
                    $5 / month
                  </Typography>
                  <Typography color="textSecondary" sx={{ fontFamily:`'FreeMono', monospace`, color: '#4771cc'}} paragraph>
                   Access to basic flashcard features and limited storage.
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ fontFamily:`'FreeMono', monospace`, backgroundColor: '#c8b6ff', '&:hover': {backgroundColor:'#E7C6FF'},}} fullWidth>
                    Coming soon!
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', borderRadius: '15px', backgroundColor:'#b8c0ff' }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontFamily:`'FreeMono', monospace`, color: '#4771cc'}} gutterBottom>
                    Pro
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontFamily:`'FreeMono', monospace`, color: '#4771cc'}} gutterBottom>
                    $10 / month
                  </Typography>
                  <Typography color="textSecondary" sx={{ fontFamily:`'FreeMono', monospace`, color: '#4771cc'}} paragraph>
                    Unlimited flashcards and storage, with priority support.
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ fontFamily:`'FreeMono', monospace`, backgroundColor: '#c8b6ff', '&:hover': {backgroundColor:'#E7C6FF'},}} fullWidth>
                    Coming soon!
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>

  );
}
