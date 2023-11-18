import { Zone } from './models'

const zoneStore: {[key:string]: Zone} = {}


const loadZones = () => {}

export const getZone = (name: string): Zone | undefined => {
    return zoneStore[name]
}
