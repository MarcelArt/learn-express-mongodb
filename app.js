const express = require('express');

const app = express();

app.get('/', (req, res) => {
    const response = {id: 1, last_name: 'Aritonang'};
    res.send(response);
});

app.listen(3000, () => {
    console.log('Server started on port 3000...');
});