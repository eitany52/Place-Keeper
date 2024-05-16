let places = []
for (let i = 0; i < 2; i++) {
    places[i] = {}
    places[i].id = makeId()
    places[i].lat = getRandomInRange()
    places[i].lng = getRandomInRange()
}
console.log(places)







// let places = []
// places[0] = {}
// places[1] = {}
// places = places.map(place => {
//     place.id = makeId()
//     place.lat = getRandomInRange()
//     place.lng = getRandomInRange()
//     return place
// })
// console.log(places)








function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getRandomInRange(from = -180, to = 180, fixed = 3) {
    return +(Math.random() * (to - from) + from).toFixed(fixed)
}
