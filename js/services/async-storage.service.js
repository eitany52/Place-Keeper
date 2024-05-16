export const storageService = {
    query,
    get,
    post,
    put,
    remove
}

async function query(entityType) {
    const entities = JSON.parse(localStorage.getItem(entityType)) || []
    return entities
}

async function get(entityType, entityId) {
    const entities = await query(entityType)
    const entity = entities.find(entity => entity.id === entityId)
    if (!entity) throw new Error("Cannot find the entity with the given id")
    return entity
}

async function post(entityType, newEntity) {
    newEntity = structuredClone(newEntity)
    newEntity.id = _makeId()
    const entities = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
}

async function put(entityType, updatedEntity) {
    const entities = await query(entityType)
    const entityIdx = entities.findIndex(entity => entity.id === updatedEntity.id)
    if (entityIdx < 0) throw new Error("Cannot find the entity with the given id")
    updatedEntity = structuredClone(updatedEntity)
    entities.splice(entityIdx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
}

async function remove(entityType, entityId) {
    const entities = await query(entityType)
    const entityToRemoveIdx = entities.findIndex(entity => entity.id === entityId)
    if (entityToRemoveIdx < 0) throw new Error("Cannot find the entity with the given id")
    entities.splice(entityToRemoveIdx, 1)
    _save(entityType, entities)
}

function _save(entityType, Entities) {
    localStorage.setItem(entityType, JSON.stringify(Entities))
}

function _makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let text = ''
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}