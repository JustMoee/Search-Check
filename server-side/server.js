// server/server.js

const express = require('express');
const apiRouter = require('./api');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files (React frontend)
//app.use(express.static('client/build'));
app.use(cors())
// Mount API routes
app.use('/', apiRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
