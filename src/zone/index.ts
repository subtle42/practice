import rfdc from 'rfdc'
import Ajv, {JTDDataType} from "ajv/dist/jtd"

const DIRCTIONS = ['north', 'south', 'east', 'west'] as const

const zoneSchema = {
    type: 'object',
    properties: {
        name: {type: 'string'},
        id: {type: 'string'},
        room: {
            enum: DIRCTIONS
        }
    },
    additionalProperties: false
} as const

export type Zone = JTDDataType<typeof zoneSchema>
export const zoneValidator = (new Ajv()).compile(zoneSchema)