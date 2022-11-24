export const filterTable = (input, data, columns) => {
    const filtered = data.filter(row => {
        for (let cidx = 0; cidx < columns.length; cidx += 1) {
            const column = columns[cidx]
            if (column.searchable === false) continue
            let targetValue = row[column.id]
            if (targetValue !== null && typeof targetValue !== 'undefined') {
                targetValue = targetValue.toString().toLowerCase()
                if (targetValue.indexOf(input.toLowerCase()) > -1) {
                    return true
                }
            }
        }
        return false
    })

    return filtered
}

