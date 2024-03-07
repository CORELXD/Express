const connection = require('../config/Database.js');

class Model_Kategori {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('Select * from produk order by id_kategori desc', (err, rows) => {
                if (err) {
                    reject(err);
                }else {
                    resolve(rows);
                }
            }); 
        }); 
    }
    
    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('insert into produk set ?', Data , function(err, result){
                if (err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            }); 
        }); 
    }
    
    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM produk where id_kategori = ' + id, (err, rows) => {
                if (err) {
                    reject(err);
                }else {
                    resolve(rows);
                }
            }); 
        }); 
    }
    
    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('update produk set ? where id_kategori = ' + id, Data, function(err, result){
                if (err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            }); 
        }); 
    }
    
    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('delete from produk where id_kategori = ' + id, function(err, result){
                if (err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            }); 
        }); 
    }
    
}



module.exports = Model_Kategori;