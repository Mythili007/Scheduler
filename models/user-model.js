function loadScheduleSchema(Schema, db) {
    var users = new Schema({
        name: {
            type: String,
            required: true
        },
        email:{
            type: String
        }
    });
    db.model("users", users, "users");
}

module.exports = users;