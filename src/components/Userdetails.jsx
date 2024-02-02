import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Avatar, Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import { Audio } from 'react-loader-spinner';
import EmailIcon from '@mui/icons-material/Email';

const UserDetails = ({ selectedUser }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      setLoading(true);
      setError(null);

      axios
        .get(`https://602e7c2c4410730017c50b9d.mockapi.io/users/${selectedUser.id}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
          setError('An error occurred while fetching user details. Please try again.');
        })
        .finally(() => {
          // delay for 0.2 seconds
          setTimeout(() => {
            setLoading(false);
          }, 200);
        });
    }
  }, [selectedUser]);

  if (!selectedUser) {
    return (
      <Paper
        style={{
          backgroundColor: '#3C3633',
          color: '#EEEDEB',
          display: 'flex',
          alignItems: 'center',
          padding: '20px',
          minWidth: '300px',
          position: isSmallScreen ? 'static' : 'fixed',
          top: isSmallScreen ? 'auto' : '65px',
          left: isSmallScreen ? 'auto' : '700px',
        }}
      >
        <Box style={{ minWidth: '550px', color: 'skyblue', padding: '20px' }}>Select a user from the list.</Box>
      </Paper>
    );
  }

  return (
    <Paper
      style={{
        backgroundColor: '#3C3633',
        color: '#EEEDEB',
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
        minWidth: isMediumScreen ? '70%' : '50%',
        position: isSmallScreen ? 'static' : 'fixed',
        top: isSmallScreen ? 'auto' : '65px',
        left: isSmallScreen ? 'auto' : '700px',
      }}
    >
      {loading ? (
        <Audio type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', alignItems: 'center' }}>
            <Avatar
              src={userData?.avatar}
              alt={userData?.name}
              style={{
                marginRight: isSmallScreen ? '0' : '20px',
                marginBottom: isSmallScreen ? '10px' : '0',
                width: isSmallScreen ? '100%' : '150px',
                height: isSmallScreen ? 'auto' : '150px',
              }}
            />
            <div>
              <Typography variant="h6" style={{ marginTop: '10px' }}>
                {userData?.profile?.firstName + ' ' + userData?.profile?.lastName}
              </Typography>
              <hr style={{ color: '#fff', width: '100%', marginLeft: 0 }} />
              <Typography variant="p">{userData?.jobTitle}</Typography>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: isSmallScreen ? '0' : '20px', textAlign: 'left' }}>
            {error ? (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            ) : (
              <>
                <Typography variant="h6" style={{ marginTop: '10px' }}>
                  Username: {userData?.profile?.username}
                </Typography>
                <hr style={{ color: '#fff', width: '100%', marginLeft: 0 }} />
                <Typography variant="p">Bio: {userData?.Bio}</Typography>
                <hr style={{ color: '#fff', width: '100%', marginLeft: 0 }} />

                <Typography variant="body1">
                  <EmailIcon style={{ paddingTop: '5px' }} /> {userData?.profile?.email}
                </Typography>
              </>
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default UserDetails;
