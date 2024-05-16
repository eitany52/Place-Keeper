import { userService } from './services/user.service.js'
import { placeService } from './services/place.service.js'

window.app = {
    onInitHomePage,
    onShowSettings,
    onSaveUserPref,
    onInitMapPage,
    onRemovePlace,
    onPanToPlace,
    onPanToUserPos
}

let gMap
let gMarkers = []

function onInitHomePage() {
    const user = userService.getUserData()
    if (user) {
        changeUserSettings(user)
    }
    showHomePage()
}

function onShowSettings() {
    const elHome = document.querySelector('.home')
    elHome.hidden = true
    const elForm = document.querySelector('.user-pref form')
    elForm.style.display = 'flex'
}

function onSaveUserPref(ev) {
    ev.preventDefault()
    const elUser = document.querySelector('.user-pref')
    const user = {}
    user.email = elUser.querySelector('label .email').value
    user.txtColor = elUser.querySelector('label .txt-color').value
    user.bgColor = elUser.querySelector('label .bgc').value
    user.age = elUser.querySelector('label .age').value
    user.birthDate = elUser.querySelector('label .date').value
    user.birthTime = elUser.querySelector('label .time').value
    showHomePage()
    changeUserSettings(user)
    userService.saveUserData(user)
}

function changeUserSettings(user) {
    const elBody = document.querySelector('body')
    elBody.style.backgroundColor = user.bgColor
    elBody.style.color = user.txtColor
    document.querySelector('form h3').style.color = user.txtColor
    const labels = document.querySelectorAll('form label')
    for (let i = 0; i < labels.length; i++) {
        labels[i].style.backgroundColor = user.bgColor
        labels[i].style.color = user.txtColor
    }
}

function showHomePage() {
    const elForm = document.querySelector('.user-pref form')
    elForm.style.display = "none"

    const elMap = document.querySelector('.map')
    elMap.hidden = true

    const elHome = document.querySelector('.home')
    elHome.hidden = false
}

async function onInitMapPage() {
    const elHome = document.querySelector('.home')
    elHome.hidden = true

    const elMap = document.querySelector('.map')
    elMap.hidden = false

    try {
        await initMap()
        console.log('Map is ready')
        renderPlaces()
        renderMarkers()
    } catch (err) {
        console.log('Error: cannot init map')
    }
}

async function renderPlaces() {
    try {
        const places = await placeService.getPlaces()
        const strHtmls = places.map(place => {
            return `
            <li data-id="${place.id}">${place.name}
            <button class="remove-btn" onclick="app.onRemovePlace('${place.id}')">X</button>
            <button class="go-btn" onclick="app.onPanToPlace('${place.id}')">Go</button>
            </li>`
        })
        document.querySelector('.places ul').innerHTML = strHtmls.join('')
    } catch (error) {
        console.log("Had issues: ", error)
    }
}

async function onRemovePlace(placeId) {
    await placeService.removePlace(placeId)
    renderPlaces()
    renderMarkers()
}

function initMap(lat = 29.550360, lng = 34.952278) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google-map available')
            gMap = new google.maps.Map(
                document.querySelector('.show-map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap)
            gMap.addListener('click', async ev => {
                const name = prompt('Place name?', 'Place 1')
                if (name) {
                    const lat = ev.latLng.lat()
                    const lng = ev.latLng.lng()
                    await placeService.addPlace(name, lat, lng, gMap.getZoom())
                    renderPlaces()
                    renderMarkers()
                }
            })
        })
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCUE7BdmEO9uF_gWcV5yY5O3eqyINxdavo'
    const elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('GoogleMaps script failed to load')
    })
}

async function onPanToPlace(placeId) {
    const place = await placeService.getPlaceById(placeId)
    gMap.setCenter({ lat: place.lat, lng: place.lng })
    gMap.setZoom(place.zoom)
}

function getUserPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

async function onPanToUserPos() {
    try {
        const userPos = await getUserPosition()
        const lat = userPos.coords.latitude
        const lng = userPos.coords.longitude
        const latLng = new google.maps.LatLng(lat, lng)
        gMap.setCenter(latLng)
        gMap.setZoom(15)
    } catch (err) {
        console.log('err', err)
    }
}

async function renderMarkers() {
    const places = await placeService.getPlaces()
    // remove previous markers
    gMarkers.forEach(marker => marker.setMap(null))
    // every place is creating a marker
    gMarkers = places.map(place => {
        return new google.maps.Marker({
            position: place,
            map: gMap,
            title: place.name
        })
    })
}