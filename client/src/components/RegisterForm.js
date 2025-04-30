import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../utils/api';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
  Stack
} from '@mui/material';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/user/register', { username, email, password });
      navigate('/login');
    } catch (err) {
      console.log('Register error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Card sx={{ maxWidth: 400, width: '100%', p: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
            Create an Account
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2} mt={2}>
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : 'Register'}
              </Button>
              <Typography variant="body2" textAlign="center">
                Already have an account?{' '}
                <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                  Log in
                </Link>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegisterForm;
