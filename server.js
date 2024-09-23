const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session'); // Add session support
const app = express();
const port = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Session middleware
app.use(session({
    secret: 'secret-key-abcd123456789', // Replace with a secret key
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 } // Session will last for 1 minute for testing
}));

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Replace with your MySQL username
    password: 'se221005',  // Replace with your MySQL password
    database: 'farrukh' // Replace with your database name
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Route to handle login request
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Email and password are required.');
  }

    // Query to check if the email and password exist
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, result) => {
      if (err) {
        console.error('Database query error:', err.message);
        return res.status(500).send('Internal server error.');
    }

        if (result.length > 0) {
            // Success: send JSON with a success status
            req.session.user = email;
            res.json({ success: true });
        } else {
            // Failure: send JSON with an error status
            res.json({ success: false, message: 'Invalid email or password' });
        }

    });
});

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login.html'); // Redirect to login page if not logged in
    }
};

// Middleware to set cache control for authenticated routes
const noCache = (req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
};

// Protected route to access courses page
app.get('/courses.html', isAuthenticated, noCache, (req, res) => {
    res.sendFile(__dirname + '/public/courses.html');
});


// Logout route to destroy the session
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        // Clear session cookie
        res.clearCookie('connect.sid');
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        res.redirect('/login.html');
    });
});

// Route to validate session
app.get('/validate-session', (req, res) => {
    if (req.session.user) {
        res.status(200).send('Session active');
    } else {
        res.status(401).send('Session expired');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
