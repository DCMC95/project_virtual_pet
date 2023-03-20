import express from 'express';
const app = express();
app.use(express.static('client'));
app.listen(8080);

// Connect via: http://127.0.0.1:8080/