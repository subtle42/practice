import { buildCmd } from "..";
import { getPlayer } from "../../player";
import { getZone } from "../../zone";
import { Room, RoomConnection } from "../../zone/models";


const DIRECTIONS = ['north', 'south', 'east', 'west']
const directionMap = {
    n: DIRECTIONS[0],
    s: DIRECTIONS[1],
    e: DIRECTIONS[2],
    w: DIRECTIONS[3]
} as const
const DIRECTION_KEYS = Object.keys(directionMap)

buildCmd('walk', {
    desc: 'walk in a direction',
    alias: 'w',
    builder: b => b.option('direction', {
        desc: 'the direction you want to walk, must have a connecting room',
        map: (input) => {
            if (!DIRECTION_KEYS.includes(input)) return input
            return DIRECTION_KEYS[input]
        },
        validation: (input) => {
            return DIRECTIONS.includes(input)
        },
        required: true
    })
    .handler(([direction], msgr) => {
        const player = getPlayer(msgr.player.name)
        if (!player) return msgr.error(``)
        const zone = getZone(player.zone)
        if (!zone) return msgr.error(``)
        const room = zone.rooms[player.room]
        if (!room) return msgr.error(``)
        const connectingRoom = room.connections[direction]
        if (!connectingRoom) return msgr.error('')
        player.room = connectingRoom.room
        const nextRoom:Room = zone.rooms[player.room]
        msgr.send(`you walk ${direction}\n${nextRoom.desc}`)
    })
})