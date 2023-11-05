type DateFormatOptions = 'date' | 'iso' | 'string' | 'time' | 'utc'
export type ValidateOptions = {
    /**
     * when `true`, stops validation on the first error, otherwise returns all the errors found. Defaults to `true`
     */
    abortEarly?: boolean
    /**
     * when `true`, allows object to contain unknown keys which are ignored. Defaults to `false`
     */
    allowUnknown?: boolean
    /**
     * when `true`, schema caching is enabled (for schemas with explicit caching rules). Default to `true`
     */
    cache?: boolean
    /**
     * provides an external data set to be used in references. Can only be set as an external option to validate() and not using `any.prefs()`
     */
    context?: string
    /**
     * when `true`, attempts to cast values to the required types (e.g. a string to a number). Defaults to `true`
     */
    convert?: boolean
    /**
     * sets the string format used when converting dates to strings in error messages and casting
     */
    dateFormat?: DateFormatOptions
    /**
     * when `true`, valid results and throw errors are decorated with a debug property which includes an array
     * of the validation steps used to generate the returned result. Defaults to `false`
     */
    debug?: boolean
}

export class JoiAny {
    protected validFns: any[] = []
    protected autoPass: any[] = []
    type = 'any'
    allow(input) {
        this.autoPass.push(input)
        return this
    }
    alter() {}
    artifact() {}
    validate(input, options:ValidateOptions) {
        const res = {
            value: input,
            error: [],
            warning: [],
            artifacts: new Map()
        }
        if (this.autoPass.includes(input)) return res
        for (let i=0; i<this.validFns.length; i++) {
            const error = this.validFns[i](input, options)
            if (!error) continue
            res.error.push(error)
            if (options.abortEarly) return res
        }

        return res
    }
}