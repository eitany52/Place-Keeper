import data from '/data/temp-songs.json'

function getAllSongIds(songs) {
    const songIds = []
    songs.forEach(song => {
        songIds.push(song.contentDetails.videoId)
    });
    return songIds
}
const songs = data.items
console.log(songs);




async function getSongsFromYoutube() {
    const songs = data.items
    const songIds = _getSongIds(songs)
    // res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${songIds[0]},${songIds[1]},${songIds[2]},${songIds[3]}&key=${API_KEY}`)
    data = await res.json()
    const songsAdditionalInfo = data.items
    _addDurationToSongs(songs, songsAdditionalInfo)
    return songs
    // return searchRes[0].items.slice(0,4)
}




// let places = []
// for (let i = 0; i < 2; i++) {
//     places[i] = {}
//     places[i].id = makeId()
//     places[i].lat = getRandomInRange()
//     places[i].lng = getRandomInRange()
// }
// console.log(places)







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
