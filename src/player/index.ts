import rfdc from 'rfdc'
import Ajv, {JTDDataType} from "ajv/dist/jtd"
const copier = rfdc()

const playerSchema = {
    type: 'object',
    properties: {
        name: {type: 'string'},
        id: {type: 'string'},
        zone: {type: 'string'}
    },
    additionalProperties: false
} as const

export type Player = JTDDataType<typeof playerSchema>
export const playerValidator = (new Ajv()).compile(playerSchema)

const playersOnline: {[key:string]: Player} = {}

export const getPlayer = (id:string): Player | undefined => {
    return copier(playersOnline[id])
}

export const getActivePlayer = (id:string): Player | undefined => {
    return copier(playersOnline[id])
}

export const login = (id: string): void => {
    playersOnline[id] = getPlayerData(id)
}

export const logout = (id: string): void => {
    delete playersOnline[id]
}

const getPlayerData = (id: string): Player => {
    return {} as any
}