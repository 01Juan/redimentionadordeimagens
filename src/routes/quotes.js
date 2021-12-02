const router = require('express').Router()

const {
    createQuote,
    getAllQuotes,
    getQuote,
    getRandomQuote,
    deleteQuote,
    updateQuote,
} = require('../controllers/quotes')

router.get('/', (req, res) => {
    res.sendFile(__dirname + "/home.html")
})

router.post("/convert", uploads.array("file", 10),(req, res) => {
    if (req.files) {
        arquivos(req, res)
    }
})

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, 'public/uploads')
    // },
    // filename: function (req, file, cb) {
    //     cb(null, file.originalname)
    //     // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    // }
})
const uploads = multer({ storage: storage })

module.exports = router