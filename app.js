// const express = require("express")
// const app = express()

// app.get("/", async (req, res)=>{
//     res.render("index")
// })
// app.listen(3000, ()=>{
//     console.log("the port listen on port : 3000");
// })

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Initialize Express
const app = express();

// Create HTTP server using the Express app
const server = http.createServer(app);

// Initialize Socket.IO and attach it to the HTTP server
const io = new Server(server);

// Serve static files (if any)
app.use(express.static('public'));

// Handle incoming connections from clients
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for a custom event from the client
    socket.on('myEvent', (data) => {
        console.log('Received data from client:', data);

        // Send a response back to the client
        io.emit('message', { message: data });
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
app.get("/", function (req, res){
    res.render("index")
})
// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});