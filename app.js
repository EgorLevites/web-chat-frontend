// public/app.js
const BACKEND_URL = "https://web-chat-backend.onrender.com";

document.addEventListener('DOMContentLoaded', () => {
    const chat = document.getElementById('chat');
    const sendBtn = document.getElementById('send');
    const messageInput = document.getElementById('message');
    const usernameInput = document.getElementById('username');
    const clientCount = document.getElementById('client-count');

    // Set up WebSocket connection
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(`${BACKEND_URL.replace('http', 'ws')}/ws`);
    

    ws.onopen = () => {
        fetchWelcomeMessage(); // Fetch a welcome message when connected
        appendSystemMessage('Connected to the chat.');
        updateClientCount(); // Initial update of client count
    };

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        appendMessage(`${msg.username}: ${msg.content}`);
    };

    ws.onclose = () => {
        appendSystemMessage('Disconnected from the chat.');
    };

    sendBtn.onclick = sendMessage;
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Send message to WebSocket server
    function sendMessage() {
        const message = messageInput.value.trim();
        const username = usernameInput.value.trim() || 'Anonymous';
        if (message === '') return; // Prevent sending empty messages
        const msg = { username, content: message };
        ws.send(JSON.stringify(msg));
        messageInput.value = ''; // Clear input field after sending
    }

    // Append message to the chat area
    function appendMessage(message) {
        const p = document.createElement('p');
        p.textContent = message;
        chat.appendChild(p);
        chat.scrollTop = chat.scrollHeight; // Scroll to the latest message
    }

    // Append system message to the chat area
    function appendSystemMessage(message) {
        const p = document.createElement('p');
        p.innerHTML = `<em>${message}</em>`;
        chat.appendChild(p);
        chat.scrollTop = chat.scrollHeight; // Scroll to the latest message
    }

    // Fetch and update the client count
    function updateClientCount() {
        fetch(`${BACKEND_URL}/api/clients`)
            .then(response => response.json())
            .then(data => {
                clientCount.textContent = `Connected clients: ${data.count}`;
            })
            .catch(error => console.error('Error fetching client count:', error));
    }

    // Fetch and display welcome message
    function fetchWelcomeMessage() {
        fetch(`${BACKEND_URL}/api/welcome`)
            .then(response => response.json())
            .then(data => {
                appendSystemMessage(data.message);
            })
            .catch(error => console.error('Error fetching welcome message:', error));
    }
    

    // Periodically update the client count every 5 seconds
    setInterval(updateClientCount, 5000);
});