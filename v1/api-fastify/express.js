const express = require('express');

const app = express();

const port = 6060;

app.get('/', (req, res) => {
  res.send('Chào mừng đến với ứng dụng Express!');
});

app.listen(port, () => {
  console.log(`Ứng dụng đang lắng nghe tại http://localhost:${port}`);
});
