var express = require('express');
var app = express();
var Agendash = require('agendash');
var Agenda = require('agenda');
var Agenda2 = require('agenda');

const mongoConnectionString = 'mongodb://127.0.0.1/agenda';
const port = process.env.PORT || 7000;

const agenda = new Agenda({
    name: 'queueID',
    db: {
        address: mongoConnectionString
    }
});


const agenda2 = new Agenda2({
    name: 'queueID',
    db: {
        address: mongoConnectionString
    }
});


app.get('/', (req, res) => res.send('Hello World!'))
app.use('/dash', Agendash(agenda));
app.use('/dash2', Agendash(agenda2));

agenda2.define('delete old users', (job, done) => {
    console.log('CONSUMED BY agenda2');
    console.log("Called delete old users " + new Date());
    done();
});



var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});

async function apiServer() {
    await agenda.start();
    console.log('INVOKED BY agenda');
    // await agenda.schedule('5 seconds', 'delete old users');
    // await agenda.processEvery('15 seconds', 'delete old users');
    // await agenda.processEvery('15 seconds', 'delete old users');
   let agendaJob = await agenda.schedule('in 30 seconds', 'delete old users');
    await agendaJob.repeatEvery('7 seconds').save();
}

async function schedulerServer() {
    await agenda2.start();
};

apiServer(); //Run apiServer to create a job
schedulerServer(); //Run schedulerServer to consume the job created by apiServer.
