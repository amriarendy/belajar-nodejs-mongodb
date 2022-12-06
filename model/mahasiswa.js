const mongoose = require('mongoose');
// Membuat schema
const Mahasiswa = mongoose.model('Mahasiswa', {
    nama: {
        type: String,
        require: true,
    },
    email: {
        type: String,
    },
});

// export Mahasiswa
module.exports = Mahasiswa;