import Ajv, {JTDDataType} from 'ajv/dist/jtd'
const ajv = new Ajv()

export type OpenApi = {
    openapi: string
    info: InfoObject
    servers?: ServerObject[]
    paths?: PathsObject
    components?: ComponentsObject
    security?: SecurityRequirementObject[]
    tags?: TagObject[]
    externalDocs?: ExternalDocumentationObject
}

const ContactSchema = {
    properties: {
        name: {type: 'string'},
        url: {type: 'string', format: "uri" },
        email: {type: 'string', format: 'email'},
    },
    additionalProperties: false
} as const

const LicenseSchema = {
    properties: {
        name: {type: 'string'}
    },
    optionalProperties: {
        url: {type: 'string', format: 'uri'}
    }
}

const InfoSchema = {
    properties: {
        title: {type: 'string'},
        version: {type: 'string'}
    },
    optionalProperties: {
        description: {type: 'string'},
        termsOfService: {type: 'string'},
        contact: ContactSchema,
        license: LicenseSchema,
    }
} as const

const ServerVariableSchema = {
    properties: {
        default: {type: 'string'}
    },
    optionalProperties: {
        enum: {
            type: 'array',
            minItems: 1,
            items: {type: 'string'}
        },
        description: {type: 'string'}
    }
} as const

const ServerSchema = {
    properties: {
        url: {type: 'string'}
    },
    optionalProperties: {
        description: {type: 'string'},
        variables: {
            type: 'object',
            patternProperties: {
                '.*': ServerVariableSchema
            }
        }
    }
} as const

const SecurityRequirementSchema = {} as const

const TagSchema = {} as const

const ExternalDocumentationSchema = {} as const

const ReferenceObjectSchema = {
    properties: {
        '$ref': {type: 'string'}
    }
} as const

const DiscriminatorSchema = {} as const

const XmlSchema = {} as const

/**
 * TODO: more to add
 */
const ComponentObjectSchema = {
    optionalProperties: {
        nullable: {type: 'boolean'},
        discriminator: {type: DiscriminatorSchema},
        readOnly: {type: 'boolean'},
        writeOnly: {type: 'boolean'},
        xml: {type: XmlSchema},
        externalDocs: {type: ExternalDocumentationSchema},
        example: {type: 'any'},
        deprecated: {type: 'boolean'}
    }
} as const

const ExampleSchema = {
    type: 'object',
    oneOf: [
        {
            optionalProperties: {
                summary: {type: 'string'},
                description: {type: 'string'},
                value: {},
            }
        },
        {
            optionalProperties: {
                summary: {type: 'string'},
                description: {type: 'string'},
                externalValue: {type: 'string'}
            }
        }
    ]
} as const
const ParameterObjectSchema = {} as const
const HeaderObjectSchema = {...ParameterObjectSchema} as const
const MediaTypeSchema = {
    optionalProperties: {
        schema: {type: [ComponentObjectSchema, ReferenceObjectSchema]},
        example: {},
        examples: {
            patternProperties: {
                '.*': {type: [ExampleSchema, ReferenceObjectSchema]}
            }
        }
    }
} as const
const ResponseObjectSchema = {
    properties: {
        description: {type: 'string'}
    },
    optionalProperties: {
        headers: {
            patternProperties: {
                '.*': {type: [HeaderObjectSchema, ReferenceObjectSchema]}
            }
        },
        content: {
            patternProperties: {
                '.*': {type: MediaTypeSchema}
            }
        }
    }
} as const


const PathsSchema = {

} as const

const ComponentsSchema = {
    optionalProperties: {
        schemas: {
            type: 'object',
            patternProperties: {
                '.*': {type: [ComponentObjectSchema, ReferenceObjectSchema]}
            }
        },
        responses: {
            type: 'object',
            patternProperties: {
                '.*': {type: [ResponseObjectSchema, ReferenceObjectSchema]}
            }
        },
        paramters: {
            type: 'object',
            patternProperties: {
                '.*': {type: [ParameterObjectSchema, ReferenceObjectSchema]}
            }
        },
        examples: {},
        requestBodies: {},
        headers: {},
        securitySchemas: {},
        links: {},
        callbacks: {}
    }
} as const

const OpenApiSchema = {
    properties: {
        openapi: {type: 'string'},
        info: InfoSchema,
        paths: PathsSchema,
        components: ComponentsSchema
    },
    optionalProperties: {
        servers: {type: 'array', items: ServerSchema},
        security: {type: 'array', items: SecurityRequirementSchema},
        tags: {type: 'array', items: TagSchema},
        externalDocs: ExternalDocumentationSchema
    }
} as const

export type InfoObject = JTDDataType<typeof InfoSchema>
export type ContactObject = JTDDataType<typeof ContactSchema>
export type LicenseObject = JTDDataType<typeof LicenseSchema>


export type ServerObject = {}
export type PathsObject = {}
export type ComponentsObject = {}
export type SecurityRequirementObject = {}
export type TagObject = {}
export type ExternalDocumentationObject = {}

export const validator = ajv.compile(OpenApiSchema)