const express = require('express');
const path = require('path');

const app = express();

const filesPath = path.join(__dirname, 'files');

app.get(['/', '/home'], (req, res, next) => {
    res.sendFile(path.join(filesPath, 'index.html'), next);
});

app.get('/contact', (req, res, next) => {
    res.sendFile(path.join(filesPath, 'contact-me.html'), next)
});

app.get('/about', (req, res, next) => {
    res.sendFile(path.join(filesPath, 'about.html'), next);
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(filesPath, '404.html'), next);
});

app.use((err, req, res, next) => {
    console.error(err);
    if(res.headersSent){
        next(err);
        return;
    }

    res.status(err.status || 500).send('Something went wrong!');
});


const PORT  = process.env.PORT || 8080;
    
app.listen(PORT, err => {
    if(err) throw err;
    console.log(`Listening at port - ${PORT}`);
});