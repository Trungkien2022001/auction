const express = require('express')
const path = require('path')
const { logger } = require('./utils/winston')

const app = express()
const port = process.env.CLIENT_PORT || 3000

// Serve static files from the 'dist/client' directory
app.use(express.static(path.join(__dirname, '../', 'client', 'build')))

// Always serve the main HTML file for any route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'))
})

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`)
})
