var express = require('express')

var imgSchema = require('../models/uploadModel.js');

var fs = require('fs');
var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

var upload = multer({ storage: storage });

exports.watchFile=(req, res) => {
	imgSchema.find({})
	.then((data, err)=>{
		if(err){
			console.log(err);
		}
		res.render('imagepage',{items: data})
	})
};


exports.addFile=( upload.single('image'), (req, res, next) => {

	var obj = {
		name: req.body.name,
		desc: req.body.desc,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}
	imgSchema.create(obj)
	.then ((err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.redirect('/');
		}
	});
});


