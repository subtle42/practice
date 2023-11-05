import { JoiObject } from "./object"


export class JoiFunction extends JoiObject {
    arity(count:number) {
        this.validFns.push((fn:Function) => {
            if (fn.length === count) return
            return {}
        })
        return this
    }
    class() {
        this.validFns.push((item) => {

        })
        return this
    }
    maxArity(max: number) {
        this.validFns.push((item: Function) => {
            if (item.length <= max) return
            return {}
        })
        return this
    }
    minArity(min: number) {
        this.validFns.push((item: Function) => {
            if (item.length >= min) return
            return {}
        })
        return this
    }
}