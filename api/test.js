const a = [
    {
        name: 'kien',
        wait: 1,
        auction: 2,
        success: 1
    },
    {
        name: 'hahaa',
        wait: 10,
        auction: 2,
        success: 1
    },
    {
        name: 'test',
        wait: 4,
        auction: 2,
        success: 1
    }
]

for (const item of a) {
    setTimeout(() => {
        console.log('Hết thời gian chờ, đang đấu ', item.name)
        setTimeout(() => {
            console.log('hết thời gian đấu, đang đợi hoàn thành', item.name)
            setTimeout(() => {
                console.log('Hết thời gian đợi', item.name)
            }, item.success * 1000)
        }, item.auction * 1000)
    }, item.wait * 1000)
}
