const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
  const message = messageInput.value;
  displayMessage(message);
  messageInput.value = '';
}

function displayMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// server.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// 클라이언트와의 소켓 연결 설정
io.on('connection', (socket) => {
  console.log('새로운 사용자가 접속했습니다.');

  // 클라이언트로부터의 메시지 수신
  socket.on('chat message', (message) => {
    console.log('메시지 수신:', message);
    // 수신한 메시지를 모든 클라이언트에게 전달
    io.emit('chat message', message);
  });

  // 클라이언트와의 소켓 연결 종료 처리
  socket.on('disconnect', () => {
    console.log('사용자가 접속을 종료했습니다.');
  });
});

// 정적 파일 서빙
app.use(express.static('public'));

// 서버 시작
server.listen(3000, () => {
  console.log('서버가 시작되었습니다. 포트: 3000');
});
