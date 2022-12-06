const { MongoClient, ObjectID } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'percobaan';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect((error, client) => {
    if (error) {
        return console.log('Koneksi Gagal!');
    }
    console.log('Koneksi Berhasil!!');

    // pilih database
    const db = client.db(dbName);

    // Menambahkan 1 data ke collection mahasiswa
    // db.collection('mahasiswa').insertOne(
    //     {
    //         nama: 'Mugiwara no Luffy',
    //         email: 'luffy@onepiece.com',
    //     },
    //     (error, result) => {
    //         if(error) {
    //             return console.log('gagal menambahkan data');
    //         }
    //         console.log(result);
    //     }
    // )

    // Menambahkan lebih dari 1 data
    // db.collection('mahasiswa').insertMany(
    //     [
    //         {
    //             nama: 'Mugiwara no Luffy',
    //             email: 'luffy@onepiece.com',
    //         },{
    //             nama: 'Akagami Shanks',
    //             email: 'shanks@onepiece.com',
    //         },{
    //             nama: 'Gol D Roger',
    //             email: 'kingroger@onepiece.com',
    //         },{
    //             nama: 'Silvers Rayleigh',
    //             email: 'rayleigh@onepiece.com',
    //         },{
    //             nama: 'Jono Joseph',
    //             email: 'jon@dummy.com',
    //         },{
    //             nama: 'no_find_look_upp',
    //             email: 'nuaro@dummy.com',
    //         },
    //     ],
    //     (error, result) => {
    //         if(error) {
    //             return console.log('gagal menambahkan data');
    //         }
    //         console.log(result);
    //     }
    // )

    // Menampilkan semua data yang ada
    // db.collection('mahasiswa').find().toArray((error, result) => {
    //     if (error) {
    //         console.log('data gagal ditampilkan');
    //     }
    //     console.log(result);
    // });
    
    // Menampilkan data berdasarkan kriteria id (untuk menampilkan id require ObjectID dahulu)
    // db.collection('mahasiswa').find({ _id: ObjectID('638e15025cd5575944c8476c') }).toArray((error, result) => {
    //     if (error) {
    //         console.log('data gagal ditampilkan');
    //     }
    //     console.log(result);
    // });

    // // Menampilkan data berdasarkan kriteria
    //     console.log(db.collection('mahasiswa').find({ nama: 'Akagami Shanks' }).toArray((error, result) => {
    //         console.log(result);
    //     })
    // );

    // Mengubah data berdasarkan kriteria id
    // const updatePromise = db.collection('mahasiswa').updateOne(
    //     {
    //         _id: ObjectID('638e15025cd5575944c84771'),
    //     },{
    //         $set: {
    //             nama: 'Edwar Newgate',
    //             email: 'shirohige@onepiece.com',
    //         },
    //     }
    // );
    // updatePromise.then((result) => { 
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // Mengubah data berdasarkan lebih dari satu
    // const updatePromise = db.collection('mahasiswa').updateMany(
    //     {
    //         _id: ObjectID('638e15025cd5575944c84771'),
    //     },{
    //         $set: {
    //             nama: 'Edwar Newgate',
    //             email: 'shirohige@onepiece.com',
    //         },
    //     },
    // );
    // updatePromise.then((result) => { 
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // Menghapus 1 data
    // db.collection('mahasiswa').deleteOne(
    //     {
    //         _id: ObjectID("638e15025cd5575944c84770"),
    //     }
    // ).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // Menghapus lebih dari 1 data
    // db.collection('mahasiswa').deleteMany(
    //     {
    //         _id: ObjectID("638e1341677a5a4b8cef5290"),
    //     }
    // ).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })
});

