const mongoose = require('mongoose');
// Membuat schema
const Contact = mongoose.model('Contact', {
    nama: {
        type: String,
        require: true,
    },
    nohp: {
        type: String,
        require: true,
    },
    email: {
        type: String,
    },
});

// export contact
module.exports = Contact;