

const minLenField = (min: number) => {
    return {
        value: min,
        message: `Length must be more than ${min}.`
    }
}

const maxLenField = (max: number) => {
    return {
        value: max,
        message: `Length must be less than ${max}.`
    }
}

const maxField = (max: number) => {
    return {
        value: max,
        message: `Value must be less than ${max}.`
    }
}

const minField = (min: number) => {
    return {
        value: min,
        message: `Value must be great than ${min}.`
    }
}

type FieldOpts = {
    required?: boolean
    min?: number
    max?: number
    maxLength?: number
    minLength?: number
    disabled?: boolean
}
export const fieldUtil = (opts: FieldOpts) => {
    const res: any= {}
    if (opts.required) res.required = 'This is a required field.'
    if (opts.min !== undefined) res.min = minField(opts.min)
    if (opts.max !== undefined) res.max = maxField(opts.max)
    if (opts.maxLength !== undefined) res.maxLength = maxLenField(opts.maxLength)
    if (opts.minLength !== undefined) res.minLength = minLenField(opts.minLength)
    if (opts.disabled !== undefined) res.disabled = opts.disabled

    return res
}