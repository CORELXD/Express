var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

var Model_Users = require('../model/Model_Users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('auth/register');
});
router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

router.post('/saveusers', async(req, res) => {
  let { email, password } = req.body;
  let enkripsi = await bcrypt.hash(password, 10);
  let Data = {
    email,
    password : enkripsi,
    level_users : 2
  };
  await Model_Users.Store(Data);
  req.flash('success', 'Berhasil Login');
  res.redirect('/login');
});

router.post('/log', async (req, res) => {
  let { email, password } = req.body;
  try {
      let Data = await Model_Users.login(email);
      if (Data.length > 0) {
          let enkripsi = Data[0].password;
          let cek = await bcrypt.compare(password, enkripsi);
          if (cek) {
              req.session.userId = Data[0].id_users;
              // req.flash('success', 'Berhasil login');
              // res.redirect('/users');
              // tambahkan kondisi penegecekan level pada user yang login
              if(Data[0].level_users == 1){
                req.flash('success', 'Berhasil login');
                res.redirect('/superusers');
              }else if(Data[0].level_users == 2){
                req.flash('success', 'Berhasil login');
                res.redirect('/users');
              }else {
                res.redirect('/login1');
              }
          } else {
              req.flash('error', 'Email atau password salah');
              res.redirect('/login');
          }
      } else {
          req.flash('error', 'Akun tidak ditemukan');
          res.redirect('/login');
      }
  } catch (err) {
      console.error(err);
      req.flash('error', 'Terjadi kesalahan saat login');
      res.redirect('/login');
  }
});

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.error(err);
    }else {
      res.redirect('/login');
    }
  });
});



module.exports = router;
