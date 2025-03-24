import http from "http";
import app from "./app";

// Create a server
// The server is created using the http module and the express app is passed to it.
const server = http.createServer(app);

// Start the server
// The server listens on the port specified in the environment variables.
server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT!}`);
});
