const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;

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
app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Amria Rendy',
            email: 'madarauchiha@ejs.co',
        },
        {
            nama: 'John',
            email: 'joni@ejs.co',
        },
        {
            nama: 'Tomcat',
            email: 'tomcat@ejs.co',
        }
    ]
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