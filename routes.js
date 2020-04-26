var express = require('express'),
router = express.Router(),
path = require('path'), //The path module provides utilities for working with file and directory paths
userCtrl = require('./user-controller');


router.use(express.static(path.resolve(__dirname, 'views'))); //We define the views folder as the one where all static content will be served
router.use(express.urlencoded({extended: true})); //We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
router.use(express.json()); //We include support for JSON that is coming from the client

//We define the root of our website and render index.html located inside the views folder
router.get('/', function(req, res){
    res.render('index');
})

router.post('/users', userCtrl.createUser);
router.get('/users', userCtrl.getUsers);
router.get('/users/:id', userCtrl.getUser);
router.delete('/users/:id', userCtrl.deleteUser);
router.put('/users/:id', userCtrl.updateUser);

module.exports.UPLOAD_PATH = 'uploads';

var multer = require('multer');
var upload = multer({ dest: module.exports.UPLOAD_PATH });

module.exports = router;