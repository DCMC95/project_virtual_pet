import express from 'express';
// import config from './config.js';
// import Postgres from 'pg';

const app = express();
app.use(express.static('client'));
app.listen(8080);

// Connect via: http://127.0.0.1:8080/


// const sql = new Postgres.Client(config);
// sql.connect();

// sql.on('error', (err) => {
//   console.error('SQL Fail', err);
//   sql.end();
// });

// app.use(express.static('client', { extensions: ['html'] }));

// function asyncWrap(f) {
//   return (req, res, next) => {
//     Promise.resolve(f(req, res, next))
//       .catch((e) => next(e || new Error()));
//   };
// }

// app.post('/messages', express.json(), asyncWrap(postMessage));

// app.listen(8080);
