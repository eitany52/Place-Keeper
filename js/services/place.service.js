import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = "placesDB"

_createPlaces()

export const placeService = {
    getPlaces,
    removePlace,
    addPlace,
    getPlaceById
}


async function getPlaces() {
    const places = await storageService.query(STORAGE_KEY)
    return places
}

function _createPlaces() {
    const places = utilService.loadFromStorage(STORAGE_KEY)
    if (!places || !places.length) {
        _createDemoPlaces()
    }
}

function _createDemoPlaces() {
    const places =
        [
            {
                id: utilService.makeId(),
                name: "Ben Gurion Airport",
                lat: 32.0004465,
                lng: 34.8706095,
                zoom: 12
            },
            {
                id: utilService.makeId(),
                name: "Dekel Beach",
                lat: 29.5393848,
                lng: 34.9457792,
                zoom: 15
            },
            {
                id: utilService.makeId(),
                name: "Dahab, Egypt",
                lat: 28.5096676,
                lng: 34.5165187,
                zoom: 11
            }
        ]
    utilService.saveToStorage(STORAGE_KEY, places)
}

async function getPlaceById(placeId) {
    return await storageService.get(STORAGE_KEY, placeId)
}

async function removePlace(placeId) {
    await storageService.remove(STORAGE_KEY, placeId)
}

async function addPlace(name, lat, lng, zoom) {
    const place = _createPlace(name, lat, lng, zoom)
    const addedPlace = await storageService.post(STORAGE_KEY, place)
    return addedPlace
}

function _createPlace(name, lat, lng, zoom) {
    return {
        id: utilService.makeId(),
        name,
        lat,
        lng,
        zoom
    }
}
