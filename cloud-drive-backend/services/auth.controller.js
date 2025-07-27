let users = []; // Simple in-memory array to store users temporarily

exports.registerUser = (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  users.push({ email, password });
  console.log("Current Users:", users);
  res.status(201).json({ message: 'User registered successfully' });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Login successful' });
};
