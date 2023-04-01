const express = require('express');
const router = express.Router();
const db = require('../model/db');

router.get("/", function (req, res) {
    res.render('index.ejs', { title: "class101 웹개발자 사관학교" });
})

router.get("/about", function (req, res) {
    res.send('About Page');
})

router.post("/postapi", function (req, res) {
    let body = req.body;
    console.log(body);
    res.send('POST API');
})

/*
    C : Create
    R : Read
    U : Update
    D : Delete

*/



// 저장 API
router.get("/data/create", function (req, res) {
    let user_id = parseInt(Math.random() * 10000);
    db.users.create({ user_id: user_id }).then(function (result) {
        res.send({ success: 200 });
    })
})

// 조회 API
router.get("/data/read", function (req, res) {
    db.users.findAll().then(function (result) {
        res.send({ success: 200, data: result });
    })
})

module.exports = router