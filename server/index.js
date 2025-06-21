const express = require('express');
const cors = require('cors');
const loginRoute = require('./routes/login'); 
const registrationRoute = require('./routes/registration');
const appointmentRoute = require('./routes/appointment');
const petRoutes = require('./routes/pets');
const userRoutes = require('./routes/users');
const servicesRouter = require('./routes/services');
const doctorRouter = require('./routes/doctor');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.json());
app.use('/api/login', loginRoute);
app.use('/api/registration', registrationRoute);
app.use('/api/appointment', appointmentRoute);
app.use('/api/pets', petRoutes);
app.use('/api/users',userRoutes)
app.use('/api/services', servicesRouter);
app.use('/api/doctor', doctorRouter);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
