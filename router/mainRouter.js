const express = require('express');
const router = express.Router();
const db = require('../model/db');

router.get("/", function (req, res) {
    res.render('main.ejs', { title: "영화 리뷰 사이트" });
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

// 변경 API -> Where: 뒤에 변경할 값의 딕셔너리 입력
router.post("/data/update", function (req, res) {
    let target_id = req.body.target_id;
    db.users.update({ user_id: 9999 }, { where: { user_id: target_id } }).then(function (result) {
        res.send({ success: 200 });
    })
})

// 삭제 API -> where: 뒤에 삭제할 값의 딕셔너리 입력
router.post("/data/delete", function (req, res) {
    let target_id = req.body.target_id;
    db.users.destroy({ where: { user_id: target_id } }).then(function (result) {
        res.send({ success: 200 });
    })
})

module.exports = router