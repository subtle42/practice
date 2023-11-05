import { JoiAny, ValidateOptions } from "./any";


export class JoiObject extends JoiAny {
    type = 'object'
    /**
     * Defines an all-or-nothing relationship between keys where if one of the peers is present, all of them are required as well
     */
    and(...peers:string[]) {
        this.validFns.push((item:object, option: ValidateOptions) => {
            let foundCount = 0
            for(let i=0; i<peers.length; i++) {
                if (!item[peers[i]]) continue
                foundCount++
            }
            if (foundCount === peers.length) return
            return {}
        })
        return this
    }
    append() {
        return this
    }
    assert() {}
    instance(input: any) {
        this.validFns.push((item:object, option: ValidateOptions) => {
            if (item instanceof input) return
            return {}
        })
        return this
    }
    keys() {}
    length(limit: number) {
        this.validFns.push((item:object, option: ValidateOptions) => {
            if (Object.keys(item).length === limit) return
            return {}
        })
        return this
    }
    max(limit: number) {
        this.validFns.push((item:object, option: ValidateOptions) => {
            if (Object.keys(item).length <= limit) return
            return {}
        })
        return this
    }
    /**
     * Specifies the minimum number of keys in the object
     */
    min(limit: number) {
        this.validFns.push((item:object) => {
            if (Object.keys(item).length >= limit) return
            return {}
        })
        return this
    }
    /**
     * Defines a relationship between keys where not all peers can be present at the same time
     */
    nand(...peers:string[]) {
        this.validFns.push((item:object) => {
            let foundCount = 0
            for(let i=0; i<peers.length; i++) {
                if (!item[peers[i]]) continue
                foundCount++
            }
            if (foundCount < peers.length) return
            return {}
        })
        return this
    }
    or() {}
    oxor() {}
    pattern() {}
    ref() {}
    regex() {}
    rename() {}
    schema() {}
    unknown() {}
    with() {}
    without() {}
    xor() {}
}