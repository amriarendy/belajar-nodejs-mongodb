const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/percobaan',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// // Manambahkan 1 Data
// const contact1 = new Contact({
//     nama: 'Ferguso',
//     nohp: '0812458443',
//     email: 'ferguso@internet.com',
// })

// // Simpan ke collection
// contact1.save().then((contact) => console.log(contact));