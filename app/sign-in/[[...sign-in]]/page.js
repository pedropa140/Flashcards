import { SignIn } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <Container maxWidth='100vw'>
      <AppBar position='static'
       sx={{ backgroundColor: "#3561c0" }}
       >
        <Toolbar>
          <Typography
            variant='h6'
            sx={{
              flexGrow: 1,
            }}
          >
            Flashcard SaaS
          </Typography>
          <Button color="inherit">
            <Link href = "/sign-in" passHref>
                Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link href = "/sign-up" passHref>
                Sign Up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Box 
      display = "flex" 
      flexDirection = "column" 
      alignItems="center" 
      justifyContent="center"
      sx={{marginTop:'100px'}}
        >
            <Typography variant="h4" sx={{fontFamily:`'FreeMono', monospace'`, color: '#4771cc'}} gutterBottom>Sign In</Typography>
            <SignIn />
      </Box>
    </Container>
  );
}
