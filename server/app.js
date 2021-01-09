const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoConnect = require('./config/mongo');

let app = express();
const server = http.createServer(app);

//middlewares
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use("/public", express.static(__dirname + "/public"));

mongoConnect();
app.use("/users", require('./routes/users'));
app.use("/products", require('./routes/products'));

app.get('/', async (req, res) => {
    res.send('Hello from server');
});


server.listen(3001, () => {
    console.log('Server is running on port 3001');
});