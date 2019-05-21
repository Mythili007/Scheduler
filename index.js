// const scheduler = require("node-schedule");
const Agenda = require("agenda");
var Agendash = require('agendash');
const express = require("express");
let nodemailer = require("nodemailer");

const connectionOpts = {db: {address: 'mongodb://localhost:27017/agenda-test', collection: 'agendaJobs'}};
// const ag = new Agenda({db: {address: mongoConnectionString}});
let agenda = new Agenda(connectionOpts);
let agendaNew = new Agenda(connectionOpts);
app = express();
app.use('/dash', Agendash(agendaNew));

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:'indira.mythili@gmail.com',
        pass: "qfosqpyioddupwbi"
    }
});

agenda.define('send email report', (job, done) => {
	console.log("TCL: job", job.attrs.data);
    const {to} = job.attrs.data;
    let mailOptions = {
        from: "indira.mythili@gmail.com",
        to: "mythili.seshabhattaru@gmail.com",
        subject: "Hola!! :)",
        text: "Hey, This is automated mail."
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error) throw error;
        else console.log("Email successfully sent");
    },done);
    // emailClient.send({
    //   to,
    //   from: 'example@example.com',
    //   subject: 'Email Report',
    //   body: '...'
    // }, done);
  });
  
  (async function() {
    await agendaNew.start();
    await agenda.every('10 seconds', 'send email report', {to: 'mythili.seshabhattaru@gmail.com'});
  })();

app.get("/", function(req, res){
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
    res.send("Check its connected!");
});

app.listen("1234");
// const agenda = new Agenda(connectionOpts);
// var rule = new scheduler.RecurrenceRule();
// var startdate = new Date(Date.now() + 5000);
// var enddate = new Date(startdate.getTime() + 5000);
// agenda.define('say Hi!', (job)=>{
//     console.log('Hello!');
// });
// agenda.start();

// agenda.processEvery('10 seconds', 'say Hi!');
// ag.processEvery('*/5 * * * * *', function (time) {
//     fs.createWriteStream("error.log").write("This is anyway going to be deleted!!!");
//     console.log("File successfully created at .\n\n" + time);
// });
// console.log("\n\n");
// //schedule after every 5sec - Delete error.log file after 5 sec 
// ag.processEvery('*/10 * * * * *', function (job, done) {
//     console.log("Running task every 10 sec...");
//     fs.unlink("./error.log", (err) => {
//         if (err) throw err;
//         console.log("File successfully deleted!\n\n");
//     });
// });



// ag.processEvery("*/6 * * * * *", function () {
//     console.log("Mail will be sent shortly.");
//     let mailOptions = {
//         from: "indira.mythili@gmail.com",
//         to: "mythili.seshabhattaru@gmail.com",
//         subject: "Hola!! :)",
//         text: "Hey, This is automated mail."
//     };
//     transporter.sendMail(mailOptions, function(error, info){
//         if(error) throw error;
//         else console.log("Email successfully sent");
//     });
// });


// const jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : [];
 
// jobTypes.forEach(type => {
//   require('./jobs/' + type)(agenda);
// });
 
// if (jobTypes.length) {
//   agenda.start(); // Returns a promise, which should be handled appropriately
// }
 
// module.exports = agenda;
