import { buildCmd } from "..";
import * as cmdStore from '../store'
import { getPlayer } from "../../player";


buildCmd('inventory', {
    alias: 'inv',
    builder: b => b.option('filter', {
        desc: 'show only items with partial matching name',
    })
    .handler(([filter, operation], msgr) => {
        const player = getPlayer(msgr.data.player)
        let response = player?.inventory || []
        if (filter) response = response.filter(x => x.includes(filter as string))
        msgr.send(response)
    }),
    desc: 'look at your inventory'
})

buildCmd('money', {
    alias: 'currency',
    builder: b => b.handler((input, msgr) => {

    })
})

buildCmd('help', {
    desc: 'will list gropus of basic commands or give descrptions about a given command',
    builder: b => b.option('cmdName', {
        map: input => input.toLocaleLowerCase(),
        validation: input => {
            if (!input) return true
            return !!cmdStore.get(input) || cmdStore.getCommandGroups().includes(input)
        }
    })
    .handler(([cmdName], msgr) => {
        const commandGroups = cmdStore.getCommandGroups()
        if (!cmdName) return msgr.send(`${commandGroups}`)
        if (commandGroups.includes(cmdName as string)) {
            return msgr.send()
        }
        const myCmd = cmdStore.get(cmdName as string)
    })
})