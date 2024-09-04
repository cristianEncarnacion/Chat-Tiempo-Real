const formulario = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

// Conectar al servidor de Socket.IO
const socket = io();

// Manejar el envío del formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") return;

  // Enviar el mensaje al servidor
  socket.emit("mensaje", input.value);

  // Limpiar el campo de entrada
  input.value = "";
});

// Manejar la recepción de mensajes
socket.on("mensaje", (data) => {
  const listas = document.createElement("li");
  listas.innerHTML = `<b>Usuario</b>: <span>${data}</span>`;
  ul.appendChild(listas);

  // Desplazar automáticamente hacia abajo
  ul.scrollTop = ul.scrollHeight;
});
