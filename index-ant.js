const express = require('express')
const multer = require('multer')
const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')
const app = express()
const AdmZip = require("adm-zip")

app.use(express.static('public'))

fs.mkdir('public/uploads', { recursive: true }, (err) => {
    if (err) throw err;
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(/ /g, "_"))
    }
})

let uploads = multer({ storage: storage })

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/home.html")
})

const object = [[640, 400], [325, 425], [200, 190], [320, 190], [100, 100]]

function criarArquivos(zip, file, name, res) {
    return new Promise(
        resolve => {
            object.map((dim) => {
                const output = path.win32.basename(file.path) + `_${dim[0]}x${dim[1]}` + path.extname(file.path)

                exec(`ffmpeg -i ${file.path.replace(/ /g, "_")} -vf scale='iw*max(${dim[0]}.1/iw\,${dim[1]}.1/ih):ih*max(${dim[0]}.1/iw\,${dim[1]}.1/ih)',crop=${dim[0]}.1:${dim[1]}.1:(in_w-out_w)/2:ih*0.05 ${output.replace(/ /g, "_")}`
                    , (error, stdout, stderr) => {
                        if (error) { console.log(`=>error: ${error}`) }
                        else { console.log("Arquivo pronto") }

                        zip.addLocalFile(output.replace(/ /g, "_"))
                        zip.writeZip(name.replace(/ /g, "_") + ".zip")
                        // console.log(zip)
                        fs.unlinkSync(output.replace(/ /g, "_"))
                        res.download(output.replace(/ /g, "_"))
                    }
                )
                console.log("Oi")

            })
            console.log(zip)
            resolve(name.replace(/ /g, "_") + ".zip")
        }
    )
}

function listaArquivos(reqfiles, res) {
    reqfiles.map(async (file) => {
        let name = file.destination + "/" + path.win32.basename(file.path, path.extname(file.path))
    // await Promise.all(reqfiles.map(async (file) => {
        const zip = new AdmZip()

        // let nameD = __dirname + "/" + path.win32.basename(file.path, path.extname(file.path)) + ".zip"
        const result = await criarArquivos(zip, file, name, res)
        // const rr = new File(result + ".zip")
        console.log("----------------------------")
        console.log(result)
        console.log("----------------------------")
        // res.download(result, (err) => {
        //     console.log(err)
        //     // if(err) throw err
        // })
    })
}

app.post("/convert", uploads.array("file", 10), (req, res) => {
    if (req.files) { listaArquivos(req.files, res) }
})

app.listen(PORT, () => {
    console.log(`App está aberto na ${PORT}`)
})