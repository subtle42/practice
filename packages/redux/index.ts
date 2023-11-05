import rfdc from "rfdc"



const copier = rfdc()

export const createStore = <S>(reducer: Reducer<S>, initState?: S, enhancer?) => {
    let myState = initState
    let state
    let listeners:ListenerFn[] = []

    return {
        getState: () => myState,
        dispatch: (action) => {
            state = reducer(state, action)
            myState = copier(state)
            let index = listeners.length
            while(index--) {
                listeners[index]()
            }
        },
        subscribe: (listener: ListenerFn) => {
            listeners.unshift(listener)
            return () => {
                listeners = listeners.filter(x => x != listener)
            }
        },
        replaceReducer: (newReducer:Reducer<S>) => {
            reducer = newReducer
        }
    }
}

export const combineReducers = (input:{[key:string]: any}) => {
    const keys = Object.keys(input)
    return (state={}, action) => {
        let index = keys.length
        const newState = {}
        let newCount = 0
        while(index--) {
            const key = keys[index]
            newState[key] = input[key](state[key], action)
            if (newState[key] !== state[key]) newCount++
        }
        return newCount ? newState : state
    }
}

type StateApi<S> = {
    getState: () => S
}
type MiddleWareFn = <S>(api:StateApi<S>) => (next:(action:AnyAction)=>any) => (action:AnyAction) => any

export const applyMiddleWare = (fns:MiddleWareFn[]) => {

}