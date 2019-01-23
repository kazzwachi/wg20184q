var express = require('express');
var router = express.Router();
var repository = require('../../lib/membersRepo');
router.route('/')
.get((req, res, next)=>{
    res.type('application/json');
    repository.list(req.query, (err, data) => {
        if(err){
            return res.status(err.statusCode).send(err);
        }
        return res.status(200).send(data);
    });
})
.post((req, res, next) => {
    res.type('application/json');
    repository.create(req.body, (err, data) => {
        if(err){
            return res.status(err.statusCode).send(err);
        }
        return res.status(200).send(data);
    });
});
router.route('/:id')
.get((req, res, next) => {
    res.type('application/json');
    repository.read(req.params.id, (err, data)=>{
        if(err){
            return res.status(err.statusCode).send(err);
        }
        return res.status(200).send(data);
    });
})
.put((req, res, next) => {
    res.type('application/json');
    if(!req.body._id || !req.body._rev){
        return res.status(400).send({msg : '_id または _revが未セット'});
    }
    
    repository.update(req.body, (err, data) => {
        if(err){
            return res.status(err.statusCode).send(err);
        }
        return res.status(200).send(data);
    });
})
.delete((req, res, next) => {
    res.type('application/json');
    if(!req.body._id || !req.body._rev){
        return res.status(400).send({msg : '_id または _revが未セット'});
    }
    repository.del(req.body._id,req.body._rev, (err, data) => {
        if(err){
            return res.status(err.statusCode).send(err);
        }
        return res.status(204).send(data);
    });
});

router.route('/byAccount/:account')
.get( (req, res, next) => {
    res.type('application/json');
    repository.list({key : req.params.account}, (err,data) => {
        if(err){
            return res.status(err.statusCode).send(err);
        }
        if(data.rows.length === 0){
            return res.status(404).send();
        }
        return res.status(200).send(data.rows[0].value);
    });
});
module.exports = router;