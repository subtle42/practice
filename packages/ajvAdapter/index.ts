import Ajv, {JTDDataType} from "ajv/dist/jtd"

const ajv = new Ajv()

const userSchema = {
    type: 'object',
    properties: {
        key: {
            type: 'string'
        }
    },
    optionalProperties: {
        name: {type: 'string'}
    },
    required: ['key']
} as const

export type User = JTDDataType<typeof userSchema>

export const userChecker = ajv.compile(userSchema)