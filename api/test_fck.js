const fs = require('fs')
const path = require('path')

const folderPathName = 'E:\\Code\\Project\\auction'
let str = ''
function countLines(filePath) {
    const content = fs.readFileSync(filePath, 'utf8')
    str += content
    const lines = content.split('\n')

    return lines.length
}

let all = 0
function processFilesInFolder(folderPath) {
    const fileExtensions = ['.js', '.json', '.jsx', '.scss', '.css']

    fs.readdirSync(folderPath).forEach(file => {
        const filePath = path.join(folderPath, file)
        const fileExt = path.extname(file)

        if (fs.statSync(filePath).isDirectory() && file !== 'node_modules') {
            processFilesInFolder(filePath) // Đệ quy vào thư mục con
        } else if (
            fileExtensions.includes(fileExt) &&
            !filePath.includes('node_modules')
        ) {
            const lineCount = countLines(filePath)
            all += lineCount
            console.log(all)
            console.log(`File ${file} có ${lineCount} dòng.`)
        }
    })
    console.log(str)
}

processFilesInFolder(folderPathName)
