const express = require('express');
const loginRoute = require('./routes/login'); // Adjust path if needed
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/login', loginRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
