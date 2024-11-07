 //

const messageInput = document.getElementById("message-input");
const chatMain = document.getElementById("chat-main");
const messageText = messageInput.value.trim();

//

 const socket = new WebSocket('ws://localhost:8080/chat');

        socket.onopen = function(event) {
            console.log('Connected to WebSocket server');
            socket.send('Hello Server richard!');
        };

        socket.onmessage = function(event) {
            console.log('Message from server:', event.data);
            // Create a new message element for other
            const messageElement = document.createElement("div");
            messageElement.classList.add("message", "other");
            messageElement.textContent = event.data;
            chatMain.appendChild(messageElement);
            //socket.send();

        // Scroll to the latest message
        chatMain.scrollTop = chatMain.scrollHeight;

        // Clear the input field
        messageInput.value = "";
        };

       
 //
 
 
 // JavaScript function to send a new message
 
 
 
 function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const chatMain = document.getElementById("chat-main");
    const messageText = messageInput.value.trim();

    if (messageText) {
        // Create a new message element
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "self");
        messageElement.textContent = messageText;
        chatMain.appendChild(messageElement);
        socket.send(messageText);

        // Scroll to the latest message
        chatMain.scrollTop = chatMain.scrollHeight;

        // Clear the input field
        messageInput.value = "";
    }

}

socket.onclose = function(event) {
    console.log('Disconnected from WebSocket server');
};

socket.onerror = function(error) {
    console.error('WebSocket Error:', error);
};