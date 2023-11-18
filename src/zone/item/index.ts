import Ajv, {JTDDataType} from "ajv/dist/jtd"


const itemSchema = {
    type: 'object',
    properties: {
        name: {type: 'string'},
        zone: {type: 'string'},
        spawnType: {enum: [] as const},
        rooms: {
            type: 'array',
            elements: {type: 'string'}
        }
    }
} as const

export type Item = JTDDataType<typeof itemSchema>
export const itemValidation = (new Ajv()).compile(itemSchema)

