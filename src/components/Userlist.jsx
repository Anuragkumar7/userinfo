import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, Avatar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Audio } from 'react-loader-spinner';

const UserList = ({ onSelectUser }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://602e7c2c4410730017c50b9d.mockapi.io/users')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching users: ', error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        width: isMediumScreen ? '60%' : '80%',
        borderRadius: '10px',
      }}
    >
      {loading ? (
        <Audio height="80" width="80" radius="9" color="green" ariaLabel="loading" wrapperStyle wrapperClass />
      ) : (
        <List>
          {users.length > 0 ? (
            users.map((user) => (
              <ListItem
                key={user.id}
                style={{
                  margin: '5px',
                  backgroundColor: '#EEEDEB',
                  borderRadius: '10px',
                  border: '2px solid black',
                  flexDirection: isSmallScreen ? 'column' : 'row',
                  alignItems: 'center',
                }}
                onClick={() => onSelectUser(user)}
                button
              >
                <Avatar src={user.avatar} alt={user.profile.firstName} />
                <div style={{ marginLeft: isSmallScreen ? '0' : '10px' }}>
                  <Typography variant="h5">{user.profile.firstName + ' ' + user.profile.lastName}</Typography>
                  <Typography variant="subtitle1" style={{ color: 'grey' }}>
                    {user.jobTitle}
                  </Typography>
                </div>
              </ListItem>
            ))
          ) : (
            <Typography align="center" variant="h5">
              No data to show!
            </Typography>
          )}
        </List>
      )}
    </div>
  );
};

export default UserList;
