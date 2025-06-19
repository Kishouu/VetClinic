const express = require('express');
const loginRoute = require('./routes/login'); 
const registrationRoute = require('./routes/registration');
const appointmentRoute = require('./routes/appointment');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/login', loginRoute);
app.use('/api/registration', registrationRoute);
app.use('/api/appointment', appointmentRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
