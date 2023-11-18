import * as cmdStore from "./store"

type CommandOptions = {
    builder?: (b: OptionFns) => void
    alias?: string
    group?: string
    validateFn?: (inputs:any[]) => boolean
    desc?: string
}
type HandlerFn = (inputs:(string|number)[], msgr) => void
type OptionFns = {
    option: (name: string, opts: OptionOpts) => OptionFns
    handler: (handlerFn:HandlerFn) => void
}
type OptionOpts<T=string> = {
    desc?: string
    default?: any
    validation?: (input:string, prev:string) => boolean
    required?: boolean
    map?: (input: string) => T
}


export const buildCmd = (name: string, cmdOpts:CommandOptions={} as any) => {
    const cmd: any = {
        name,
        ...cmdOpts,
        options: [] as any[]
    }

    if (!cmdOpts.builder) return console.warn(`${name} cmd, has no builder`)

    cmdOpts.builder({
        option: function(name, opts) {
            cmd.options.push({name, ...opts})
            return this
        },
        handler: function(handlerFn) {
            cmd.handler = handlerFn
            cmdStore.add('name', cmd)
        }
    })
}

export const runCmd = (input: string, msgr) => {
    let values = input.split(' ')
    const cmdName = input[0]
    values = values.slice(1)

    const myCmd = cmdStore.get(cmdName)
    const response: any[] = []
    if (!myCmd) return msgr(`Command: ${myCmd}, does not exist`)
    for (let i=0; i< myCmd.options.length; i++) {
        const myOpt = myCmd.options[i]
        let myValue = values[i]
        if (myOpt.default && myValue === undefined) myValue = myOpt.default
        if (myOpt.required && myValue === undefined) return msgr.error('')
        if (myOpt.map) myValue = myOpt.map(myValue)
        if (myOpt.validation && !myOpt.valdation(myValue, values[i-1])) return msgr.error('')
        response.push(myValue)
    }
    if (myCmd.validation && !myCmd.valdation(response)) return msgr.error('')
    myCmd.handler(response, msgr)
}
