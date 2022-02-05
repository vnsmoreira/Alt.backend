const express = require('express');
const app = express();
const cors = require('cors');

const searchRoutes = require('./routes/searchRoutes');
const downloadRoutes = require('./routes/downloadRoutes');
const infoRoutes = require('./routes/infoRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/search', searchRoutes);
app.use('/download', downloadRoutes);
app.use('/info', infoRoutes);

const ip = '192.168.15.127';
const port = process.env.PORT || 3000;

app.listen(port, ip, () => {
  console.info(`Running on: ${ip}:${port}`);
});
