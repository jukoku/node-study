const express = require('express');
const router = express.Router();
const db = require('../model/db');

const cheerio = require('cheerio');
const axios = require('axios');
const iconv = require('iconv-lite');
const url = "https://finance.naver.com/sise/sise_quant.naver";

router.get("/crawling", function (req, res) {

    axios({ url: url, method: 'GET', responseType: "arraybuffer" }).then(function (html) {
        const content = iconv.decode(html.data, "EUC-KR").toString();
        const $ = cheerio.load(content);

        const table = $(".type_2 tbody tr td");
        table.each(function (i, tag) {
            console.log($(tag).text().trim());
        });

    });

    res.send({ success: 200 });
})

// 영화 리뷰 사이트 시작
router.get("/", function (req, res) {
    res.render('main.ejs', { title: "영화 리뷰 사이트" });
})

// 영화 리뷰 생성 API
router.post("/review/create", function (req, res) {
    let movie_id = req.body.movie_id;
    let review = req.body.review;

    if (movie_id == '' || movie_id == 0) {
        res.send({ success: 400 });
    } else {
        db.reviews.create({ movie_id: movie_id, review: review }).then(function (result) {
            res.send({ success: 200 });
        })
    }

})

// 영화 리뷰 보기 API
router.get("/review/read", function (req, res) {
    let movie_id = req.query.movie_id;

    db.reviews.findAll({ where: { movie_id: movie_id } }).then(function (result) {
        res.send({ success: 200, data: result });
    })

})

// Api Get Router 테스트
router.get("/about", function (req, res) {
    res.send('About Page');
})

// API POST Router 테스트
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