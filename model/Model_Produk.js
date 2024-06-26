const connection = require('../config/Database.js');

class Model_Produk {

    static async getAll() {
        return new Promise((resolve, reject) => {
           
            connection.query('SELECT produk.*, kategori.nama_kategori FROM produk LEFT JOIN kategori ON produk.id_kategori = kategori.id_kategori', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM produk a LEFT JOIN kategori b ON b.id_kategori = a.id_kategori ORDER BY a.id_produk DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO produk SET ?', Data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM produk a LEFT JOIN kategori b ON b.id_kategori = a.id_kategori WHERE a.id_produk = ?', id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE produk SET ? WHERE id_produk = ?', [Data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM produk WHERE id_produk = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Produk;