let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:'indira.mythili@gmail.com',
            pass: "qfosqpyioddupwbi"
        }
    });

    module.exports = function(agenda) {
        agenda.define('registration email', (job, done) => {
          User.get(job.attrs.data.userId, (err, user) => {
            if (err) {
              return done(err);
            }
            email(user.email(), 'Thanks for registering', 'Thanks for registering ' + user.name(), done);
          });
        });
    };