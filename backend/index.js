// require('dotenv').config();
const connectToMongo = require("./Database/db");
const express = require("express");
const app = express();
const path = require("path");

connectToMongo();

const port = process.env.PORT || 5000; // Use environment port or default to 5000

// Import cors and configure it
const cors = require('cors');

// List of allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',  // for local testing
  'https://apcoer-it-studsync-1.onrender.com' // your deployed frontend
];

// Apply CORS middleware with the allowed origins
app.use(cors({
  origin: allowedOrigins,      // allow origins specified
  credentials: true            // allow cookies or headers to be sent with the requests
}));

app.use(express.json()); // to convert request data to json

// Basic route to check if server is working
app.get("/", (req, res) => {
  res.send("Hello  I am Working Fine ");
});

app.use('/media', express.static(path.join(__dirname, 'media')));

// Credential APIs
app.use("/api/student/auth", require("./routes/Student Api/credential.route"));
app.use("/api/faculty/auth", require("./routes/Faculty Api/credential.route"));
app.use("/api/admin/auth", require("./routes/Admin Api/credential.route"));

// Details APIs
app.use("/api/student/details", require("./routes/Student Api/details.route"));
app.use("/api/faculty/details", require("./routes/Faculty Api/details.route"));
app.use("/api/admin/details", require("./routes/Admin Api/details.route"));

// Other APIs
app.use("/api/timetable", require("./routes/Other Api/timetable.route"));
app.use("/api/material", require("./routes/Other Api/material.route"));
app.use("/api/notice", require("./routes/Other Api/notice.route"));
app.use("/api/subject", require("./routes/Other Api/subject.route"));
app.use("/api/marks", require("./routes/Other Api/marks.route"));
app.use("/api/branch", require("./routes/Other Api/branch.route"));

app.use('/api/ai', require('./routes/ai'));  // AI routes

// Start the server
app.listen(port, () => {
  console.log(`Server Listening On http://localhost:${port}`);
});
