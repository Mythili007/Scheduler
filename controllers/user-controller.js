let app = express(),
  User = require('../models/user-model'),
  agenda = require('../worker.js');
 
app.post('/users', (req, res, next) => {
  const user = new User(req.body);
  user.save(err => {
    if (err) {
      return next(err);
    }
    agenda.now('registration email', {userId: user.primary()});
    res.send(201, user.toJson());
  });
});