import { add, get } from "./store"

type CommandOptions = {
    builder?: (b: OptionFns) => void
    validateFn?: (inputs:any[]) => boolean
}
type OptionFns = {
    option: (name: string, opts: OptionOpts) => OptionFns
    handler: () => void
}
type OptionOpts<T=string> = {
    default?: any
    validation?: (input:string, prev:string) => boolean
    required?: boolean
    map?: (input: string) => T
}


export const buildCmd = (name: string, cmdOpts:CommandOptions={}) => {
    const cmd: any = {
        name,
        ...cmdOpts,
        options: [] as any[]
    }

    return {
        option: function(name: string, opts: OptionOpts) {
            cmd.options.push({
                name,
                ...opts
            })
            return this
        },
        handler: function(handlerFn) {
            cmd.handler = handlerFn
            add(cmd.name, cmd)
        }
    }
}

export const runCmd = (input: string, msgr) => {
    let values = input.split(' ')
    const cmdName = input[0]
    values = values.slice(1)

    const myCmd = get(cmdName)
    if (!myCmd) return msgr(`Command: ${myCmd}, does not exist`)
}

buildCmd('run', {
    builder: b => {
        b.option('', {

        })
    }
})