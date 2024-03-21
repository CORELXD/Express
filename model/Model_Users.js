const connection = require('../config/Database.js');

class Model_Users {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users ORDER BY id_users DESC', (err, rows) => {
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
            connection.query('insert into users set ?', Data , function(err, result){
                if (err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            }); 
        }); 
    }
    
    static async login(email) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE email = ?', [email] , (err, result) => {
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
            connection.query('SELECT * FROM users WHERE id_users = ' + id, (err, rows) => {
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
            connection.query('UPDATE users SET ? WHERE id_users = '+ id, Data, function(err, result){
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
            connection.query('DELETE FROM users WHERE id_users =' + id, function(err, result){
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }


}


module.exports = Model_Users;
