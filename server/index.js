const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
//  Middleware
app.use(bodyParser.json());
app.use(cors());

//  api routes 

const post = require('./routes/api/posts');
app.use('/api/posts', post);



// Handle production

if (process.env.NODE_ENV = 'production') {
    // Static foler 
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA 

    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}


// Set port
const port = process.env.PORT | 5000;


// Listen to port
app.listen(port, () => console.log(`Server running on port ${port}`));
