const express = require('express');
const router = express.Router();
const Model_Dpi = require('../model/Model_Dpi');

router.get('/', async function(req, res, next) {
    try {
        let rows = await Model_Dpi.getAll();
        res.render('dpi/index', {
            data: rows
        });
    } catch (error) {
        next(error);
    }
});

router.get('/create', function (req, res, next) {
    res.render('dpi/create', {
        nama_dpi: '',
        luas: ''
    });
});

router.get('/edit/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let dpi = await Model_Dpi.getById(id);
        res.render('dpi/edit', {
            id: dpi.id_dpi,
            nama_dpi: dpi.nama_dpi,
            luas: dpi.luas
        });
    } catch (error) {
        next(error);
    }
});

router.post('/store', async function (req, res, next) {
    // console.log('hallooo')
    try {
        let { nama_dpi, luas } = req.body;
        let data = {
            nama_dpi,
            luas
        }
        await Model_Dpi.create(data);
        req.flash('success', 'Berhasil menyimpan data dpi');
        res.redirect('/dpi');
    } catch (error) {
        req.flash('error', 'Gagal menyimpan data dpi');
        res.redirect('/dpi');
    }
});

router.post('/update/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let { nama_dpi, luas} = req.body;
        let data = {
            nama_dpi,
            luas
        }
        await Model_Dpi.update(id, data);
        req.flash('success', 'Berhasil memperbarui data dpi');
        res.redirect('/dpi');
    } catch {
        req.flash('error', 'Gagal memperbarui data dpi');
        res.redirect('/dpi');
    }
});

router.get('/delete/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        await Model_Dpi.delete(id);
        req.flash('success', 'Berhasil menghapus data DPI');
        res.redirect('/dpi');
    } catch (error) {
        req.flash('error', 'Gagal menghapus data DPI');
        res.redirect('/dpi');
    }
});

module.exports = router;