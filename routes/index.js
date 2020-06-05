var express = require('express');
var router = express.Router();
var Sentiment = require('../Analyzis/lib/index');
var sentiment = new Sentiment();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Review Sentimental Analyzer' });
});

router.post('/analyze_review', function (req, res, next) {
    var reviewText = req.body.reviewText
    var score = sentiment.analyze(reviewText);
    var list = score.calculation
    var table = []
    for (var i = 0; i < list.length; i++) {
        var key = Object.keys(list[i]);
        var value = Object.values(list[i])
        var obj = { word : key , score : value };
        console.log(obj)
        table.push(obj)

    }
    res.render('analyze_page', { reviewText: reviewText, analysis: score, table: table });
    console.log(score);
});

module.exports = router;
