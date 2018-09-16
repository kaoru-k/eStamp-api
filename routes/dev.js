const express = require('express');
const bodyparser = require('body-parser')
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();
let db = new sqlite3.Database('data.db');


db.get('SELECT count(*) FROM sqlite_master WHERE type="table" and name=$name', {$name: 'spot'}, function (err, res) {
    if (!(0 < res['count(*)'])) {
        db.run('CREATE TABLE spot (spotId integer primary key, likeCount integer)');
    }
});

router.use(bodyparser.json());

router.get('/like/:spotId', function(req, res) {
    db.get('SELECT likeCount FROM spot WHERE spotId=(?)', req.params.spotId, function(err, row){
        var param = {
            request: true,
            data: {
                spotId: req.params.spotId,
                likeCount: row.likeCount
            }
        };
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send(param);
    });
});

router.post('/like/:spotId', function(req, res) {
    db.run('UPDATE spot SET likeCount = likeCount+1 WHERE spotId=(?)', req.params.spotId);
    var param = {
        request: true
    };
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send(param);
});

module.exports = router;