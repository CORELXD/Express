const express = require('express');
const router = express.Router();

const Model_Keahlian = require('../model/Model_Keahlian');
const Model_Mahasiswa = require('../model/Model_Mahasiswa');

router.get('/', async function(req, res, next) {
    try {
        const keahlians = await Model_Keahlian.getAll();
        res.render('keahlian/index', { data: keahlians });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/create', async function(req, res, next) {
    try {
        
        let data = await Model_Mahasiswa.getAll(); 
        res.render('keahlian/create', { 
            nama_keahlian:'',
            tingkat_keahlian:'',
            id_mahasiswa:'',
            data: data 
        });
    } catch (error) {
        
        next(error);
    }
});


router.post('/store', async function(req, res, next) {
    try {
        let data = {
            nama_keahlian: req.body.nama_keahlian,
            tingkat_keahlian: req.body.tingkat_keahlian,
            id_mahasiswa: req.body.id_mahasiswa}
        await Model_Keahlian.store(data);
        req.flash('success', 'Keahlian created successfully');
        res.redirect('/keahlian');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to create Keahlian');
        res.redirect('/keahlian');
    }
});

router.get('/edit/:id', async function(req, res, next) {
    try {
        let dataMahasiswa = await Model_Mahasiswa.getAll();
        const id = req.params.id;
        const keahlian = await Model_Keahlian.getById(id);
        if (!keahlian) {
            return res.status(404).send('Data keahlian tidak ditemukan');
        }
        
        res.render('keahlian/edit', {
            id: id,
            nama_keahlian: keahlian.nama_keahlian,
            tingkat_keahlian: keahlian.tingkat_keahlian,
            id_mahasiswa: keahlian.id_mahasiswa,
            data: dataMahasiswa 
        });
    } catch (error) {
        console.error(error);
        next(error); 
    }
});


router.post('/update/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        let data = {
            nama_keahlian: req.body.nama_keahlian,
            tingkat_keahlian: req.body.tingkat_keahlian,
            id_mahasiswa: req.body.id_mahasiswa}
        await Model_Keahlian.update(id, data);
        req.flash('success', 'Keahlian updated successfully');
        res.redirect('/keahlian');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to update Keahlian');
        res.redirect('/keahlian');
    }
});

router.get('/delete/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        await Model_Keahlian.delete(id);
        req.flash('success', 'Keahlian deleted successfully');
        res.redirect('/keahlian');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to delete Keahlian');
        res.redirect('/keahlian');
    }
});

module.exports = router;