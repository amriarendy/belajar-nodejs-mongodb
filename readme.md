### Create Read Update and Delete Nodejs with Mongodb

### info spec

- nodejs v16.16.0
- npm v8.11.0

### modules spec

- exspress@4.17.1
- nodemon
- ejs@3.1.6
- express-ejs-layouts@2.5.0 https://www.npmjs.com/package/express-ejs-layouts
- morgan@1.10.0
- express-validator@6.10.1
- express-session@1.17.1
- cookie-parser@1.4.5
- connect-flash@0.1.1
- mongoose@5.12.13
- method-override@3.0.0

### how to running

- how to start?
- starting terminal > nodemon app
- open in browser url > http://localhost:3000
- uninstall modules npm uninstall modules_apa_yang_mau_dihapus

### tools and plugin

- prettier plugin
- mengignore plugin prettier buat file .prettierignore dan ketik \*.ejs
- getbootsrtap

### description module

- view engine
- memungkinkan untuk membuat file tempate statis untuk aplikasi
- engine untuk mengganti variable di template dengan nilai sebenarnya, dan menampilkan dalam bentuk html
  ada banyak view templating engine seperti contoh Pug, Hami, Eta Ejs dan React. namun untuk file ini menggunakan EJS https://ejs.co/

### express-ejs-layouts

- sebuah sistem layout dari ejs biar 1 main template
- const expressLayouts = require('express-ejs-layouts');
- // menggunakan express-ejs-layouts dan masukan attribute layout: 'dir/file' `app.use(expressLayouts);`

### Built-in middleware

- untuk membuat folder assets (foto, docx, css dll) bisa di akses public
- `app.use(express.static('public'));`

### express middleware

- susunan middleware level beraturan yaitu dibaca dari bawah ke atas

### Third-party middleware

- morgan for routing

### jika ada notifikasi ini

- body-parser deprecated undefined extended: provide extended option
- maka berikan { extended: true }
- app.use(express.urlencoded({ extended: true }));

### mongoose

- Object modeling untuk mongodb. sebagai schema model untuk nodejs, ada casting, validation, query building dan logic hooks.

### method-override

- Untuk mengganti verb dari https (yang biasanya: get, post).

### how to install mongodb [Click Here](https://goican.id/cara-install-database-mongodb)
