var express = require('express');
var router = express.Router();
router.route('/list')
.get( (req, res, next) => {
    let body = {};
    body.title = 'アカウント一覧';
    res.type('text/html');
    return res.render('members',body);
});
module.exports = router;