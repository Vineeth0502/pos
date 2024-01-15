const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2/promise');
const pool = require('./database');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/public/', express.static('./public'));

const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
