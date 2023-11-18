
import { runCmd } from "./index"
import * as cmdStore from './store'


describe('cmd module', () => {
    describe('runCmd function', () => {
        let msgr
        beforeEach(() => {
            msgr = {
                error: jest.fn()
            }
            
        })

        it('should call msgr.error if cmd does NOT exist', () => {
            jest.mock('cmdStore', () => ({
                get: () => undefined
            }))
            runCmd('test', msgr)
            expect(msgr.error).toHaveBeenCalled()
        })
    })
})