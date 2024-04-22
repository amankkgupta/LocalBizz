// // Import required modules
// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const fs = require('fs');

// function readUsers() {
//   if (!fs.existsSync('users.json') || fs.readFileSync('users.json', 'utf8') === '[]') {
//     return [];
//   }
//   return JSON.parse(fs.readFileSync('users.json', 'utf8'));
// }

// // Create an instance of express
// const app = express();

// // Set up body-parser middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Define routes
// app.get('/', (req, res) => {
//   // Assuming you want to initially render the register page
//   res.sendFile(path.join(__dirname, '/routes/register.html'));
// });

// // Route to handle registration form submission
// app.post('/register', (req, res) => {
//   const { username, password } = req.body;
//   const users = readUsers();

//   // Check if the username already exists
//   if (users.some(user => user.username === username)) {
//     return res.status(400).send('Username already exists');
//   }

//   // Add the new user to the users array
//   users.push({ username, password });

//   // Write the updated users array to the users.json file
//   fs.writeFileSync('users.json', JSON.stringify(users));

//   res.redirect('/login');
// });

// // Route to handle login form submission
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const users = readUsers();

//   // Check if the username exists
//   const user = users.find(user => user.username === username);

//   if (!user) {
//     return res.status(400).send('Invalid username or password');
//   }

//   // Check if the password is correct
//   if (user.password!== password) {
//     return res.status(400).send('Invalid username or password');
//   }

//   // If the credentials are correct, redirect to the home route
//   res.redirect('/home');
// });

// // Serve static files from the public directory
// app.use(express.static(path.join(__dirname, 'routes')));

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




// const express = require('express');
// const fs = require('fs');
// const bodyParser = require('body-parser');
// const loginData = fs.readFileSync('./login.html','utf-8');
// const homeData = fs.readFileSync('./home2.html', 'utf-8')

// const app = express();
// const port = 3000;
// app.use(bodyParser.urlencoded({ extended: true }));

// // Load user data from JSON file
// let userData = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

// //home endpoint
// app.get('/', (req,res) => {
//     res.sendFile(__dirname + '/home2.html')
// })

// // Signup endpoint
// app.get('/register', (req, res) => {
//     res.sendFile(__dirname + '/register.html');
// });


// app.post('/register', (req, res) => {
//     const { username, password } = req.body;

//     // Check if user already exists
//     if (userData[username]) {
//         res.send('User already exists');
//     } else {
//         // Add new user to data
//         userData[username] = password;
//         // Save updated data to JSON file
//         fs.writeFileSync('users.json', JSON.stringify(userData));
//         // res.send('Signup successful');
        
//         res.send(loginData);
//     }
// });

// // Login endpoint
// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '/login.html');
// });

// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     // Check if user exists and password matches
//     if (userData[username] && userData[username] === password) {
//         // res.send('Login successful');
//         res.send(homeData);
//     } else {
//         res.send('Invalid username or password');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });


















const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files (including images)
app.use(express.static(path.join(__dirname)));

app.use(bodyParser.urlencoded({ extended: true }));

// Load user data from JSON file
let userData = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

// Home endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home2.html'));
});

// Signup endpoint
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    if (userData[username]) {
        res.send(`<h1>User already exists</h1><br> Click <a href='/login.html'>here</a> to login`);
    } else {
        // Add new user to data
        userData[username] = password;
        // Save updated data to JSON file
        fs.writeFileSync('users.json', JSON.stringify(userData));
        res.sendFile(path.join(__dirname, 'login.html'));
    }
});

// Login endpoint
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists and password matches
    if (userData[username] && userData[username] === password) {
        res.sendFile(path.join(__dirname, 'home2.html'));
    } else {
        res.send('Invalid username or password');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
