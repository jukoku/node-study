const express = require('express');
const router = express.Router();
const db = require('../model/db');

const cheerio = require('cheerio');
const axios = require('axios');
const iconv = require('iconv-lite');

// 크롤링할 사이트
const url = "https://finance.naver.com/sise/sise_quant.naver";

// 엑셀 파일 내려받기
router.get("/excel/down", function (req, res) {
    let excel_data = [{ "A": 1, "B": 2, "C": 3, "D": 4 }];
    res.xls('data.xlsx', excel_data);
})


// 엑셀 파일 업로드 -> json파일 변환
router.get("/excel", function (req, res) {
    res.render("excel.ejs");
})



// 크롤링 시작 
router.get("/crawling", function (req, res) {

    // axios를 이용해서 html페이지를 전체 가져옴
    axios({ url: url, method: 'GET', responseType: "arraybuffer" }).then(function (html) {

        // iconv를 이용해서 글자를 깨지지 않게 한글로 인코딩해서 저장함
        const content = iconv.decode(html.data, "EUC-KR").toString();

        // cheerio를 이용해서 저장한 데이터를 불러옴 불러온 데이터를 $에 저장
        const $ = cheerio.load(content);

        // cheerio에 있는 데이터 중 원하는 데이터를 .클래스 태그 등으로 선택해서 불러옴
        const table = $(".type_2 tbody tr td");

        // 불러온 데이터를 순차적으로 콘솔로 인쇄
        table.each(function (i, tag) {
            console.log($(tag).text().trim());
        });

    });

    res.send({ success: 200 });
})

// 크롤링 끝



// 영화 리뷰 사이트 시작
router.get("/", function (req, res) {
    res.render('main.ejs', { title: "영화 리뷰 사이트" });
})

// 영화 리뷰 생성 API
router.post("/review/create", function (req, res) {
    let movie_id = req.body.movie_id;
    let review = req.body.review;

    // 아이디가 없을 경우 경고
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

// 영화 리뷰 사이트 끝


// Router 예제 시작

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

// Router 예제 끝

/*
    C : Create
    R : Read
    U : Update
    D : Delete

*/

// sequelize - mysql CRUD 예제 시작

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

// sequelize - mysql CRUD 예제 끝

module.exports = router