/*  */

const amqp = require("amqplib/callback_api");
const express = require("express");
const bodyparser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(bodyparser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.render(__dirname + '/views/' + 'index.html');
});

app.post('/subscribe', function (req, res) {
    var payload = {};
    // payload.event = "sendMail";
    req.body.event = "sendMail";
    sendToQueue(req.body);
    res.send("Thank you for subscribing");
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

function sendToQueue(payload) {
    amqp.connect("amqp://localhost", (err, connection) => {
        connection.createChannel((err, channel) => {
            console.log("@ payloadL : ", payload);
            const eventName = payload.event;
            channel.assertQueue(eventName, {
                durable: true
            });
            channel.sendToQueue(eventName, new Buffer(JSON.stringify(payload)), {
                persistent: true
            });
            console.log("Message sent to queue: ", payload);
        });
    });
}
