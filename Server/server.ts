import http from "http";
import app from "./app";
import { initializeSocket } from "./Socket";

// Ensure the PORT environment variable is defined, or provide a default
const port = process.env.PORT || 5000;

// Create the HTTP server using the Express app
const server = http.createServer(app);

// Initialize the socket server
initializeSocket(server);

// Start the server and log the listening port
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
