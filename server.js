const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

app.use(express.json());
const cors = require('cors');
app.use(cors());

const port = 3000;

//몽고DB 연결
let db;
MongoClient.connect('mongodb+srv://gilsuAdmin:1q2w3e4r@cluster0.tkfuxtn.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err);

  db = client.db('authpractice');

  app.listen(port, () => {
    console.log('안녕! Example app listening on port 3000');
  });
});

const data = {
  username: 'test@google.com',
  password: '1q2w3e4r',
};

//리액트에서 제작한 build를 사용하기
app.use(express.static(path.join(__dirname, 'auth/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'auth/build/index.html'));
});

app.get('/api/userList', (req, res) => {
  res.send(data);
});

//서브페이지 리액트 라우터로 관리하게하기 (항상 최하단 유지)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'auth/build/index.html'));
});
