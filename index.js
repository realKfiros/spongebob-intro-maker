const express = require('express');
const path = require('path');
const app = express();
const api = require('./server');

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api', api);

app.get('*', function (req, res)
{
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(9000);
