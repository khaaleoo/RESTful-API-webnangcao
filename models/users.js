var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var userSchema = mongoose.Schema({
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, 'password must has more than 6 characters.']
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    aboutMe: {
        type: String,
        trim: true
    },
    verify: {
        type: Boolean,
        default: false
    },
    profilePicture: { 
        type: String, 
    },
    created: { 
        type: Date,
        default: Date.now
    }
});

// hash user password before saving into database
userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

// // check password valid?
// userSchema.methods.validPassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// };

const User = mongoose.model('User',userSchema);

module.exports = User;