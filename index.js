//Requisitos
const { exec } = require('child_process')
const AdmZip = require("adm-zip")
const express = require('express')
const router = require('express').Router()
const fs = require('fs')
const multer = require('multer')
const path = require('path')


//Variáveis
const app = express()
// const dimensoes = [[640, 400], [325, 425], [200, 190], [320, 190]]
// const dimensoes = [[1920, -1]]

// function resolucao() {
//     let dimensoes = document.getElementById("resolucao");
//     console.log(dimensoes)
// }

const PORT = process.env.PORT || 3001

// app.use(express.static('public'))
// app.use('/js', express.static(__dirname, + '/js'));
// app.use('/css', express.static(__dirname, + '/css'));
app.use(express.static(path.join(__dirname, 'public')));

//Pré configurações de pastas
fs.mkdir('public/uploads', { recursive: true }, (err) => {
    if (err) throw err
})

fs.mkdir('public/downloads', { recursive: true }, (err) => {
    if (err) throw err
})

const uploads = multer({ 
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }),
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
            "image/avif",
            "image/webp",
            "image/apng",
            "image/tiff",
            "image/*"
        ]

        console.log(file.mimetype)

        if ( allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Invalid file type."))
        }
    } 
})

// app.use(express.static('public'))
app.use('/download', express.static(__dirname + '/public/downloads'))

//Servidor
app.listen(PORT, () => {
    console.log(`App está aberto na porta ${PORT}`)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/home.html")
    // res.render(__dirname + "/home.html")
})

// server.get("/", (req, res) => {
//     return res.render("index.html", { title: "Um título"})
// })
// app.get('/downloads/', (req, res) => {
//     // Calculate the size of the JS when zipped.
//     const zip3 = new AdmZip();
//     zip3.addFile('file.js', new Buffer(fs.readFileSync("/public/downloads/tudo.zip")))


//     const data = zip2.toBuffer()
//     const downloadName = `juan.zip`;
//     res.set('Content-Type', 'application/zip')
//     res.set('Content-Disposition',`attachment; filename=${downloadName}`);
//     res.set('Content-Length', data.length);
//     res.send(__dirname + "/public/downloads/tudo.zip")
// })

app.post("/convert", uploads.array("file", 30),(req, res) => {
    if (req.files) {
        arquivos(req, res)
    }
})

// Pega os arquivos
async function arquivos (req, res){
    // const tudao = await arqName(req, res)
    
    // const data = fs.readFile(await tudao, (err, contents) => {

        // console.log(tudao )
        const reqDel = req
        const fff = await arqName(reqDel)

        // const fff = fs.readFile(await arqName(req), (err, cont) => {err => console.log(err)})
        console.log(fff)
        console.log(path.parse(fff).name + path.extname(fff))
            setTimeout(async() => {
                // console.log(await arqName(req))
                    res.download(fff, "tudo.zip", (err) => {
                        if (err) {
                            fs.unlinkSync(fff)
                        } else {
                            fs.unlinkSync(fff)
                            req.files.map(
                                file => {
                                    console.log(file.filename)
                                    console.log(file.path)
                                    fs.unlinkSync(file.path)
                                }
                            )
                        }
                    })
                    // res.send(fff)
                }, 10000
            )
            
        
        
    // })
    // const downloadName = `juan.zip`;
    // res.set('Content-Type', 'application/zip')
    // res.set('Content-Disposition',`attachment; filename=${downloadName}`);
    // res.set('Content-Length', data.length);
    // console.log(data)
    // await res.send(data);
    
    // res.download(zip2)
    // res.download(zip2)
    // res.send(a)        
}

// Gerenciamento de arquivos
async function arqName(req){
    const zip2 = new AdmZip()
    const nameZip2 = `./public/downloads/tudo.zip`
    const a = []

    await req.files.map(
        file => {
            const zip = new AdmZip()
            const name = path.parse(file.filename).name
            // const ext = path.extname(file.filename)
            const ext = ".jpg"

            const nameZip = `./public/downloads/${name}.zip`

            arqDimensoes(file, zip, zip2, name, ext, nameZip, nameZip2, req)

            a.push(Object.assign(file, {"link": `/download/${name}.zip`}))
            // return nameZip2
        }
    )
    return nameZip2
}

// Gerencia as dimensões
function arqDimensoes(file, zip, zip2, name, ext, nameZip, nameZip2, req){
    const dimensoes = req.body.resolucao.split(" ")
    dimensoes.map(
        dim => {
            const nameI = file.path
            const x = dim.split("x")[0]
            const y = dim.split("x")[1]
            let nameD = `${name}${ext}`
            if (dimensoes.length > 1) {
                nameD = `${name}_${x}x${y}${ext}`
            }

            const nameO = `./public/downloads/${nameD}`
            // const nameO = `./public/downloads/${name}${ext}`
            
            // a.push(`/download/${nameD}`)
            ffmpeg(nameI, x, y, nameO, zip, zip2, nameZip, nameZip2)
        }
    )
}

// Executa o FFmpeg
function ffmpeg(nameI, x, y, nameO, zip, zip2, nameZip, nameZip2){
    // exec(`ffmpeg -i "${nameI}" -vf scale='iw*max(${x}.1/iw\,${y}.1/ih):ih*max(${x}.1/iw\,${y}.1/ih)',crop=${x}.1:${y}.1:(in_w-out_w)/2:ih*0.05 "${nameO}"`
    if (y == 0) {
        console.log("Estou no Y")
        // exec(`ffmpeg -i "${nameI}" -vf "scale='iw*max(${x}.1/iw\,${y}.1/ih)':'ih*max(${x}.1/iw\,${y}.1/ih)'","crop='${x}.1':'${y}.1':'(in_w-out_w)/2':'ih*0.05'" "${nameO}"`
        exec(`ffmpeg -i "${nameI}" -vf "scale='${x}':'-1'" "${nameO}"`
        , (error, stdout, stderr) => {
            if (error) { console.log(`=>error Y: ${error}`) }

            // zip.addLocalFile(nameO)
            // zip.writeZip(nameZip)
            // zip2.toBuffer(nameO);
            // res.send(data);
            zip2.addLocalFile(nameO)
            // zip2.addFile(nameO)
            zip2.writeZip(nameZip2)
            fs.unlinkSync(nameO)
            // return zip2
        })
    } else if (x == 0) {
        console.log("Estou no X")
        // exec(`ffmpeg -i "${nameI}" -vf "scale='iw*max(${x}.1/iw\,${y}.1/ih)':'ih*max(${x}.1/iw\,${y}.1/ih)'","crop='${x}.1':'${y}.1':'(in_w-out_w)/2':'ih*0.05'" "${nameO}"`
        exec(`ffmpeg -i "${nameI}" -vf "scale='-1':'${y}'" "${nameO}"`
        , (error, stdout, stderr) => {
            if (error) { console.log(`=>error X: ${error}`) }

            // zip.addLocalFile(nameO)
            // zip.writeZip(nameZip)
            // zip2.toBuffer(nameO);
            // res.send(data);
            zip2.addLocalFile(nameO)
            // zip2.addFile(nameO)
            zip2.writeZip(nameZip2)
            fs.unlinkSync(nameO)
            // return zip2
        })
    } else {
        console.log("Estou no X e Y")
        exec(`ffmpeg -i "${nameI}" -vf "scale='iw*max(${x}.1/iw\,${y}.1/ih)':'ih*max(${x}.1/iw\,${y}.1/ih)'","crop='${x}.1':'${y}.1':'(in_w-out_w)/2':'ih*0.05'" "${nameO}"`
        , (error, stdout, stderr) => {
            if (error) { console.log(`=>error X e Y: ${error}`) }
            zip2.addLocalFile(nameO)
            zip2.writeZip(nameZip2)
            fs.unlinkSync(nameO)
        })
    }
}

// Quando desconectar
process.on('SIGINT', () => {
    console.log("Desconectou!!!")
})