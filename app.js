const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult, check, Result } = require('express-validator');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
require('./utils/db');
const Contact = require('./model/contact');
const Mahasiswa = require('./model/mahasiswa');
const { findOne } = require('./model/contact');

const app = express();
const port = 3000;

// Setting up method-override
app.use(methodOverride('_method'));

// setting up view menggunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts); // menggunakan express-ejs-layouts dan masukan attribute layout: 'dir/file'
app.use(express.static('public')); // Built-in middleware
app.use(express.urlencoded({ extended: true }));

// Setting up flash
app.use(cookieParser());
app.use(session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

// menampilan pesan ke terminal sedang running
app.listen(port, () => {
    console.log(`Nodejs With Mongodb | app listening at http://localhost:${port}`);
});

// Page Home
app.get('/', async (req, res) => {
    const mahasiswa = await Mahasiswa.find();
    res.render('index', { 
        layout: 'layouts/main',
        name: 'amriarendy', 
        title: 'Halaman Home', 
        mahasiswa});
});

// Page About
app.get('/about', (req, res) => {
    res.render('about', { 
        layout: 'layouts/main',
        title: 'Halaman About',
    });
});

// Page add contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        layout: 'layouts/main',
        title: 'Halaman Tambah Contact',
    });
});

// Processing tambah data contact
app.post('/contact', [
    body('nama').custom( async (value) => {
        const duplikat = await Contact.findOne({nama: value });
        if(duplikat) {
            throw new Error('Nama kontak telah digunakan');
        }
        return true;
    }),
    body('email').isEmail(),
    check('nohp', 'No Handphone Harus Indonesia').isMobilePhone('id-ID'),
    ], 
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({errors: errors.array()});
            res.render('add-contact', {
                layout: 'layouts/main',
                title: 'Halaman Tambah Contact',
                errors: errors.array(),
            })
        } else {
            Contact.insertMany(req.body, (error, result) => {
            // Kirimkan flash message
            req.flash('msg', 'Data kontak berhasil ditambahkan');
            res.redirect('/contact');
        });
    }
});

// Processing delete data
// app.get('/contact/delete/:nama', async (req, res) => {
//     const contact = await Contact.findOne({nama: req.params.nama });

//     if (!contact) {
//         res.status(404);
//         res.render('404', {
//             layout: 'layouts/main',
//             title: '404 Page Not Found'
//         });
//     } else {
//         Contact.deleteOne({ _id: contact._id }).then((result) => {
//             // Kirimkan flash message
//             req.flash('msg', 'Data kontak berhasil dihapus');
//             res.redirect('/contact');
//         });
//     }
// });

app.delete('/contact', (req, res) => {
    // res.send(req.body);
        Contact.deleteOne({ nama: req.body.nama }).then((result) => {
        // Kirimkan flash message
        req.flash('msg', 'Data kontak berhasil dihapus');
        res.redirect('/contact');
    });
});

// Page edit
app.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama});
    res.render('edit-contact', {
        layout: 'layouts/main',
        title: 'Halaman Edit Contact',
        contact,
    });
});

// Processing update
app.put('/contact', [
    body('nama').custom( async (value, { req }) => {
        const duplikat = await Contact.findOne({ nama: value });
        if( value !== req.body.oldNama && duplikat ) {
            throw new Error('Nama kontak telah digunakan');
        }
        return true;
    }),
    body('email').isEmail(),
    check('nohp', 'No Handphone Harus +62').isMobilePhone('id-ID'),
    ], 
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({errors: errors.array()});
            res.render('edit-contact', {
                layout: 'layouts/main',
                title: 'Halaman Edit Contact',
                errors: errors.array(),
                contact:req.body,
            })
        } else {
            Contact.updateOne(
                {
                     _id: req.body._id 
                },{
                    $set: {
                        nama: req.body.nama,
                        email: req.body.email,
                        nohp: req.body.nohp,
                    },
                },
            ).then((result) => {
                // Kirimkan flash message
                req.flash('msg', 'Data kontak berhasil ditambahkan');
                res.redirect('/contact');
            });
        }
});

// Page Contact
app.get('/contact', async (req, res) => {
    // Jika mau menjalankan tanpa async dan await
    // Contact.find().then((contact) => {
    //     res.send(contact);
    // });

    const contacts = await Contact.find();
    res.render('contact', {
        layout: 'layouts/main',
        title: 'Halaman Contact',
        contacts,
        msg: req.flash('msg'),
    });
});

// Page detail
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });
    res.render('detail', {
        layout: 'layouts/main',
        title: 'Halaman Detail Contact',
        contact,
    });
});

// Page Not Found 404
app.use('/', (req, res) => {
    res.render('404', {
        layout: 'layouts/main',
        title: '404 Page Not Found'
    });
});