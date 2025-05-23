const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    try {

        const { username, email, password, phone } = req.body;
        const existingUser = await User.findOne({ email });
        
        // Prevent duplicate registration with same email
        if (existingUser){
            return res.status(400).json({ error: 'Email already in use' });
        } 
  
      // Securely hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Authenticate user and return JWT token
  exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user){
            return res.status(400).json({ error: 'Invalid credentials' });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch){
            return res.status(400).json({ error: 'Invalid credentials' });
        }
  
        // Generate JWT token with user ID
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
  
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Fetch user data by ID, excluding the password field
  exports.getUserById = async(req,res)=>{
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).select('-password');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };