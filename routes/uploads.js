const router = require('express').Router();
var fs = require("fs");
const multer = require('multer');
// const ffmpeg = require('fluent-ffmpeg');


const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, './uploads/') },

    filename: function (req, file, cb) {
        let name = file.originalname.split('.');
        name = Date.now().toString() + '.' + name[name.length - 1];
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

router.post('/multer', upload.single('fileSource'), (req, res) => {
    res.json({ status: 1, fileName: req.file.filename });
});

router.post('/fs', (req, res) => {
    let b = req.body;
    let name = b.name.split('.');
    name = Date.now().toString() + '.' + name[name.length - 1]
    let img = b.file;
    let realFile = Buffer.from(img, "base64");
    fs.writeFile('./uploads/' + name, realFile, function (err) {
        if (err) console.log(err);
    });

    res.json({ status: 1, msg: "iyhk.gjhmcf", fileName: name })
    // res.json({status:1, fileName: '123'})
})

router.post('/video', (req, res) => {
    let b = req.body;
    let thumbnail = [];
    let name = b.name.split('.')
    name = Date.now().toString() + '.' + name[name.length - 1]
    let video = b.file;
    let realFile = Buffer.from(video, "base64");
    fs.writeFile('./uploads/' + name, realFile, function (err) {
        if (err) console.log(err);
    });
    ffmpeg(`./uploads/${name}`)
        .on('filenames', function (fileNames) {
            console.log('Will generate ' + fileNames)
            thumbnail = fileNames;
        })
        .on('end', function (stdout, stderr) {
            res.json({ status: 1, thumbnail, videoName: name });
        })
        .on('error', function (err) {
            console.log('an error happened: ' + err.message);
        })
        .takeScreenshots({
            timestamps: ['10%'],
            filename: `${Date.now()}`,
            folder: './uploads'
        });
});

module.exports = router;