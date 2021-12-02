const express = require('express')

const quotesRouter = require('./routes/quotes')

const app = express()

app.use(express.json())

app.use('/routes/quotes', quotesRouter)

app.listen(
    process.env.PORT || 3030,
    console.log(`App est� aberto na porta ${PORT}`)
)