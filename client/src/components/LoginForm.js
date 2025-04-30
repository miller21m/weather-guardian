import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token, user } = await api.post('/user/login', { email, password });
      login(user, token);
      navigate('/alerts');
    } catch (err) {
      console.log('Login error:', err);
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
            Login to Your Account
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2} mt={2}>
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
                {loading ? <CircularProgress size={22} color="inherit" /> : 'Login'}
              </Button>
              <Typography variant="body2" textAlign="center">
                Don't have an account?{' '}
                <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                  Sign up
                </Link>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginForm;
