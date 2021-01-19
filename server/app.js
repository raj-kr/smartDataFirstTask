const express = require('express');
const http = require('http');
const path = require("path");
const cors = require('cors');
const mongoConnect = require('./config/mongo');
const Keys = require('./config/');

let app = express();
const server = http.createServer(app);
//middlewares
console.log('clinet', Keys.client);
app.use(
    cors({
        origin: Keys.client,
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

/* 
* Routes
*/
app.use("/users", require('./routes/users'));
app.use("/products", require('./routes/products'));

// app.use(express.static(path.join(__dirname, './build')));
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve("./", "build", "index.html"));
// });
app.get('/', async (req, res) => {
    res.send('Hello from server');
});


server.listen(Keys.port, () => {
    console.log(`Server is running in ${Keys.environment} mode on port ${Keys.port}`);
});