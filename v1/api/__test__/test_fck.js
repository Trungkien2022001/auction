const fs = require('fs')
const path = require('path')
const { logger } = require('../utils/winston')
let str = ''
function countLines(filePath) {
    const content = fs.readFileSync(filePath, 'utf8')
    str += content
    const lines = content.split('\n')

    return lines.length
}

let all = 0
let  arr = []
function processFilesInFolder(folderPath) {
    const fileExtensions = ['.js', '.ts', '.json', '.jsx', '.scss', '.css', '.java', '.ts', '.py']

    fs.readdirSync(folderPath).forEach(file => {
        const filePath = path.join(folderPath, file)
        const fileExt = path.extname(file)

        if (fs.statSync(filePath).isDirectory() && file !== 'node_modules') {
            processFilesInFolder(filePath) // Đệ quy vào thư mục con
        } else if (
            fileExtensions.includes(fileExt) &&
            !filePath.includes('package') &&
            !filePath.includes('spec.ts') &&
            !filePath.includes('node_modules')
        ) {
            const lineCount = countLines(filePath)
            all += lineCount
            arr.push({
                c: lineCount,
                name: file
            })
        }
    })
}
processFilesInFolder(folderPathName)
logger.info(JSON.stringify(arr.sort((a, b)=>a.c > b.c ? -1 : 1)))
