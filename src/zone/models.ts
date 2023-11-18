import Ajv, {JTDDataType} from "ajv/dist/jtd"

const ajv = new Ajv()
const DIRCTIONS = ['north', 'south', 'east', 'west'] as const

const connectionSchema = {
    type: 'object',
    properties: {
        direction: {enum: DIRCTIONS},
        room: {type: 'string'},
    },
    optionalProperties: {
        cmd: {type: 'string'}
    }
} as const

const roomSchema = {
    type: 'object',
    properties: {
        name: {type: 'string'},
        desc: {type: 'string'},
        cmds: {
            type: 'array',
            elements: {type: 'string'}
        },
        connections: {
            type: 'object',
            patternProperties: {
                '.*': connectionSchema
            }
        }
    }
} as const

const zoneSchema = {
    type: 'object',
    properties: {
        name: {type: 'string'},
        id: {type: 'string'},
        rooms: {
            type: 'object',
            patternProperties: {
                '.*': roomSchema
            },
        }
    }
} as const

type _Zone = JTDDataType<typeof zoneSchema>
export interface Zone extends _Zone {
    rooms: {[key:string]: Room}
}
type _Room = JTDDataType<typeof roomSchema>
export interface Room extends _Room {
    connections: {[key:string]:RoomConnection}
}
export type RoomConnection = JTDDataType<typeof connectionSchema>

export const zoneValidator = ajv.compile(zoneSchema)
