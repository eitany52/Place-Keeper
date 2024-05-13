import { userService } from './services/user.service.js'

window.app = {
    onInit,
    onShowSettings,
    onSaveUserPref
}

function onInit() {
    const user = userService.getUserData()
    if (user) changeUserSettings(user)
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
    elForm.style.display = 'none'
    const elHome = document.querySelector('.home')
    elHome.hidden = false
}