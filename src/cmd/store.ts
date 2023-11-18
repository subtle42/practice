
const data:{[key:string]: any} = {}

const commandGroups: string[] = []

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

export const getCommandGroups = () => {
    return [...commandGroups]
}

/**
 * list all commands that belong to a group
 */
export const getCommandsInGroup = (groupName: string): any[] => {
    return Object.keys(data)
        .filter(key => {
            return data[key].alias !== key && data[key].group === groupName
        })
        .map(key => data[key])
}