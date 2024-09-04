const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configuración de Socket.IO
io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");

  // Emitir un mensaje de bienvenida al cliente que se conecta
  socket.emit("mensaje", "Bienvenido al chat");

  // Escuchar mensajes del cliente
  socket.on("mensaje", (msg) => {
    // Emitir el mensaje a todos los clientes
    io.emit("mensaje", msg);
  });

  // Manejar la desconexión del cliente
  socket.on("disconnect", () => {
    console.log("Un cliente se ha desconectado");
  });
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Enviar el archivo HTML al acceder a la ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Iniciar el servidor
server.listen(3000, () => console.log("Server is running on port 3000"));
