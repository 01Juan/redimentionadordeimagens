const express = require('express')

const multer = require('multer')

const {exec} = require('child_process')

const path = require('path')

const fs = require('fs')

const app = express()

app.use(express.static('public'))

var dir = 'public'

var subDirectory = 'public/uploads'

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir)

    fs.mkdirSync(subDirectory)
}

var storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'public/uploads')
    },
    filename:function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var uploads = multer({storage:storage})

const PORT = process.env.PORT || 3000

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/home.html")
})

app.post('/convert', uploads.single('file'), (req,res) => {
    if(req.file){
        console.log(req.file.path)

        var output = Date.now() + 'output.mp3'

        exec(`ffmpeg -i ${req.file.path} ${output}`, (error, stdout, stderr) => {
            if(error){
                console.log(`error: ${error}`)
                // console.log(`error: ${error.messagem}`)
            }
            else {
                console.log("Arquivo convertido")
                
            }res.download(output, (err) => {
                if(err) throw err

                fs.unlinkSync(req.file.path)
                fs.unlinkSync(output)
            })
        })
    }
})

app.listen(PORT, () => {
    console.log(`App está aberto na ${PORT}`)
})
