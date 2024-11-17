
# Web Chat Frontend

This is the frontend for the Web Chat application. It is a simple HTML/JavaScript application that connects to the backend WebSocket server to enable real-time chat functionality.

## Features

- Displays a real-time chat interface.
- Shows the number of connected clients.
- Allows users to send and receive messages.

## Requirements

- A modern web browser with JavaScript enabled.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/web-chat-frontend.git
   cd web-chat-frontend
   ```

2. Serve the static files:
   Use any static file server to serve the `index.html` file, or use the backend's built-in file server.

3. Open `index.html` in your browser.

## Configuration

- The `BACKEND_URL` variable in `app.js` is dynamically updated to point to the local backend server URL (`http://localhost:8080`) using a `sed` command during the Docker build process.

## Dockerfile Explanation

The frontend application is containerized using a Dockerfile that serves static files through Nginx.

### Dockerfile

```dockerfile
# Use the official Nginx image as the base
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Remove the default Nginx content
RUN rm -rf ./*

# Copy frontend files to Nginx
COPY index.html app.js styles.css ./

# Replace the production backend URL with the local backend URL
RUN sed -i 's|https://web-chat-backend-rry8.onrender.com|http://localhost:8080|g' app.js

# Expose port 80
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
```

### Steps to Build and Run Docker Container

1. Build the Docker image:
   ```bash
   docker build -t web-chat-frontend .
   ```

2. Run the container:
   ```bash
   docker run -d -p 80:80 --name web-chat-frontend-container web-chat-frontend
   ```

3. Access the frontend at [http://localhost](http://localhost).

## Docker Compose

The frontend is configured to work with Docker Compose along with the backend:

### docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./web-chat-frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build:
      context: ./web-chat-backend
    ports:
      - "8080:8080"
```

To start both the backend and frontend together:
```bash
docker-compose up --build
```

Access the frontend at [http://localhost](http://localhost), and the backend API at [http://localhost:8080](http://localhost:8080).

## Usage

1. Open the frontend in a browser.
2. Enter your username.
3. Type a message and click "Send" to participate in the chat.

## Dependencies

- Bootstrap for styling.
- WebSocket for real-time communication.

## License

MIT License
