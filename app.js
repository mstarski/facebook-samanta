const app = require('express')();
const http = require('http').Server(app);

app.get('/', (req, res) => {
    res.json(
        {
            message: 'Hello world!'
        }
    )
});

http.listen(process.env.PORT || 8080, console.log('Listening ...'));