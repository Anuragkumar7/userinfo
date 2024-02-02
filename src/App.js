import React, { useState } from 'react';
import UserList from './components/Userlist';
import UserDetails from './components/Userdetails';
import {
  Container,
  CssBaseline,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid container spacing={2} style={{ marginTop: '5px' }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            Users List
          </Typography>
          <UserList onSelectUser={handleSelectUser} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            position: isSmallScreen ? 'static' : 'fixed',
            bottom: isSmallScreen ? 'auto' : isMediumScreen ? '50px' : '630px',
            right: isSmallScreen ? 'auto' : '400px',
          }}
        >
          <Typography variant="h5" gutterBottom>
            User Details
          </Typography>

          <UserDetails selectedUser={selectedUser} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
