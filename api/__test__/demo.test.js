function findNumber(arr, value) {
    if (arr && arr.length && arr.find(i => i === value)) {
        return true
    }

    return false
}
test('Find number', () => {
    expect(findNumber([1], 1)).toBe(true)
})
test('Test pass', () => {
    expect(true).toBe(true)
})
test('Test failed', () => {
    expect(
        (function() {
            return true
        })()
    ).toBe(false)
})
