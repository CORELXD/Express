const express = require('express');
const router = express.Router();
const Model_Alat_Tangkap = require('../model/Model_Alat_Tangkap');

router.get('/', async function(req, res, next) {
    try {
        let rows = await Model_Alat_Tangkap.getAll();
        res.render('alat_tangkap/index', {
            data: rows
        });
    } catch (error) {
        next(error);
    }
});

router.get('/create', function (req, res, next) {
    res.render('alat_tangkap/create', {
        nama_alat_tangkap: ''
    });
});

router.get('/edit/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let alat_tangkap = await Model_Alat_Tangkap.getById(id);
        res.render('alat_tangkap/edit', {
            id: alat_tangkap.id_alat_tangkap,
            nama_alat_tangkap: alat_tangkap.nama_alat_tangkap
        });
    } catch (error) {
        next(error);
    }
});

router.post('/store', async function (req, res, next) {
    try {
        let { nama_alat_tangkap } = req.body;
        let data = {
            nama_alat_tangkap
        }
        await Model_Alat_Tangkap.create(data);
        req.flash('success', 'Berhasil menyimpan data alat tangkap');
        res.redirect('/alat_tangkap');
    } catch (error) {
        req.flash('error', 'Gagal menyimpan data alat tangkap');
        res.redirect('/alat_tangkap_Gagal');
    }
});

router.post('/update/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let { nama_alat_tangkap } = req.body;
        await Model_Alat_Tangkap.update(id, { nama_alat_tangkap });
        req.flash('success', 'Berhasil memperbarui data alat tangkap');
        res.redirect('/alat_tangkap');
    } catch {
        req.flash('error', 'Gagal memperbarui data alat tangkap');
        res.redirect('/alat_tangkap');
    }
});

router.get('/delete/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        await Model_Alat_Tangkap.delete(id);
        req.flash('success', 'Berhasil menghapus data alat tangkap');
        res.redirect('/alat_tangkap');
    } catch (error) {
        req.flash('error', 'Gagal menghapus data alat tangkap');
        res.redirect('/alat_tangkap');
    }
});

module.exports = router;