import { utilService } from './util.service.js'

const STORAGE_KEY = "userData"

export const userService = {
    saveUserData,
    getUserData
}

function saveUserData(userData) {
    utilService.saveToStorage(STORAGE_KEY, userData)
}

function getUserData() {
    return utilService.loadFromStorage(STORAGE_KEY)
}