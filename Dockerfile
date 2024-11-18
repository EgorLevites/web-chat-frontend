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