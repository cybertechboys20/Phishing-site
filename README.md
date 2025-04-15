# Phishing Simulation Website
Features
This project simulates a phishing website to test user behavior and capture login credentials. It includes various tools and tracking mechanisms designed to capture interaction data and simulate fraudulent login behavior for educational purposes only.

1. Fake Login Page
A visually convincing replica of the Facebook login page, designed to simulate the login experience.

Collects username and password inputs via fake login functionality.

2. User Credential Capture
Logs credentials entered by users into a server-side file (user_credentials.txt).

Credentials (username and password) are saved for later analysis.

3. Tracking Features
Keylogger: Captures and logs keystrokes when the user types on the page.

Mouse Movement Tracking: Tracks mouse movements across the page to capture user interaction behavior.

Page Visits: Logs user visits to the phishing page, capturing their device details and IP address.

4. Geolocation Logging
Captures geolocation data (latitude and longitude) of the user when they visit the site or interact with it.

5. Admin Panel
An administrative interface to view and manage logs.

Allows admins to view the contents of tracker.log (user actions like key presses, mouse movements) and user_credentials.txt (captured credentials).

Admins can clear logs from the panel for privacy or security purposes.

6. Login Simulation
After entering fake credentials, users see a loading screen indicating "followers" being added to their account.

Followers are incremented to simulate user engagement and interaction.

7. Fake Followers Tracker
Users' fake follower count is increased over time to simulate a social media experience, adding a layer of realism to the phishing site.

Milestones of followers added are shown in a dynamic list.

8. Server-Side Logging
All user interactions (including mouse movements, keystrokes, and login attempts) are logged into tracker.log on the server.

Logs contain detailed information such as user agent, IP address, device type, geolocation, and timestamp.

9. Static File Serving
The entire website, including the phishing page, admin panel, and tracking scripts, is served using Express.js for easy deployment and interaction.

10. Real-Time Data Capture
The site captures real-time interaction data, such as the mouse position and keystrokes, and sends them to the server.

Important Notes
This project is for educational purposes only and is intended to be used in controlled environments.

The admin panel allows viewing logs of user credentials and activities; it should not be used for malicious purposes.

Ensure that users are informed of the simulated nature of this site when using it for any kind of testing.
