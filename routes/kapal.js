const express = require("express");
const router = express.Router();
const Model_Kapal = require("../model/model_Kapal.js");
const Model_Pemilik = require("../model/model_Pemilik.js");
const Model_Dpi = require("../model/model_Dpi.js");
const Model_Alat_Tangkap = require("../model/model_Alat_Tangkap.js");

router.get("/", async function (req, res, next) {
    try {
        let rows = await Model_Kapal.getAll();
        let pemilikData = await Model_Pemilik.getAll();
        let dpiData = await Model_Dpi.getAll();
        let alatTangkapData = await Model_Alat_Tangkap.getAll();
        res.render("kapal/index", {
            data: rows,
            pemilik: pemilikData,
            dpi: dpiData,
            alatTangkap: alatTangkapData
        });
    } catch (error) {
        req.flash("error", error.message || "Terjadi kesalahan pada server");
        res.redirect("/kapal");
    }
});

router.get("/create", async function (req, res, next) {
    try {
        let pemilikData = await Model_Pemilik.getAll();
        let dpiData = await Model_Dpi.getAll();
        let alatTangkapData = await Model_Alat_Tangkap.getAll();
        res.render("kapal/create", {
            pemilik: pemilikData,
            dpi: dpiData,
            alatTangkap: alatTangkapData
        });
    } catch (error) {
        req.flash("error", error.message || "Terjadi kesalahan pada server");
        res.redirect("/kapal");
    }
});

router.post("/store", async function (req, res, next) {
    try {
        // Ambil data dari form
        let {
            nama_kapal,
            id_pemilik,
            id_dpi,
            id_alat_tangkap
        } = req.body;
        // Masukkan data ke dalam objek
        let data = {
            nama_kapal,
            id_pemilik,
            id_dpi,
            id_alat_tangkap
        };
       
        await Model_Kapal.create(data);
        req.flash("success", "Berhasil menyimpan data");
    } catch (error) {
        req.flash("error", error.message || "Terjadi kesalahan pada server");
    }
    res.redirect("/kapal");
});

router.get("/edit/:id", async function (req, res, next) {
    try {
        let id = req.params.id;
        let kapalData = await Model_Kapal.getById(id);
        let pemilikData = await Model_Pemilik.getAll();
        let dpiData = await Model_Dpi.getAll();
        let alatTangkapData = await Model_Alat_Tangkap.getAll();
        
        // Jika tidak ada data kapal, kirimkan pesan error
        if (!kapalData) {
            throw new Error("Data kapal tidak ditemukan");
        }
        
        res.render("kapal/edit", {
            id: id,
            nama_kapal: kapalData.nama_kapal || '', // Pastikan ini sesuai dengan struktur data Anda
            pemilik: pemilikData,
            dpi: dpiData,
            alatTangkap: alatTangkapData
        });
    } catch (error) {
        req.flash("error", error.message || "Terjadi kesalahan pada server");
        res.redirect("/kapal");
    }
});

// Rute untuk mengupdate data
router.post("/update/:id", async function (req, res, next) {
    try {
        let id = req.params.id;
        // Ambil data dari form
        let {
            nama_kapal,
            id_pemilik,
            id_dpi,
            id_alat_tangkap
        } = req.body;
        // Masukkan data ke dalam objek
        let data = {
            nama_kapal: nama_kapal,
            id_pemilik: id_pemilik,
            id_dpi: id_dpi,
            id_alat_tangkap: id_alat_tangkap
        };
        // Update data menggunakan model
        await Model_Kapal.update(id, data);
        req.flash("success", "Berhasil memperbarui data");
    } catch (error) {
        req.flash("error", error.message || "Terjadi kesalahan pada server");
    }
    res.redirect("/kapal");
});

// Rute untuk menghapus data
router.get("/delete/:id", async function (req, res) {
    try {
        let id = req.params.id;
        // Hapus data menggunakan model
        await Model_Kapal.delete(id);
        req.flash("success", "Berhasil menghapus data");
    } catch (error) {
        req.flash("error", error.message || "Terjadi kesalahan pada server");
    }
    res.redirect("/kapal");
});

module.exports = router;