export const socket = new WebSocket("ws://localhost:8090");
socket.onmessage = ({ data }) => {
  console.log(data);
};

socket.onopen = () => {
  socket.send("Hello world");
};
