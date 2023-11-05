
const data = {}


export const add = (key:string, newData) => {
    if (data[key]) {
        console.warn(`Item with id: ${key}, as not added already exists`)
        return
    }
    data[key] = newData
}

export const get = (key: string) => {
    return data[key]
}