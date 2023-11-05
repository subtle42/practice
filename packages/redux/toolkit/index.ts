import rfdc from "rfdc"

const copier = rfdc()


type ConfigureStoreOptions<S> = {
    reducer: Reducer<S>,
    devTools?: boolean,
    preloadedState?: S,
    middleware?: any
}
export function configureStore<S>(opts: ConfigureStoreOptions<S>) {

}

type BuilderOptionFns = {
    addCase: (type, reducer:Reducer<any>) => BuilderOptionFns
    addMatcher: (matchFn, reducer:Reducer<any>) => BuilderOptionFns
    addDefaultCase: (reducer: Reducer<any>) => BuilderOptionFns
}
type BuilderFn = (builder: BuilderOptionFns) => void

function createReducerBuilderFn(opts):BuilderOptionFns {
    return {
        addCase: function(type, reducer) {
            opts.reducers[type] = reducer
            return this
        },
        addMatcher: function(matchFn, reducer) {
            opts.matchers.push({
                matchFn,
                reducer
            })
            return this
        },
        addDefaultCase: function(reducer) {
            opts.default = reducer
            return this
        }
    }
}

type Matcher = {
    matcher: (action) => boolean
    reducer: Reducer<any>
}
type _ReducerOpts = {
    reducers: {[key:string]: Reducer<any>}
    matchers: Matcher[]
    default: (x) => any
}

export function createReducer<S>(initState:S, builderFn: BuilderFn): Reducer<S>
export function createReducer<S>(initState:() =>S, builderFn: BuilderFn): Reducer<S>
export function createReducer<S>(initState:S, reducerMap: {[key:string]: Reducer<any>}): Reducer<S>
export function createReducer<S>(initState:() => S, reducerMap: {[key:string]: Reducer<any>}): Reducer<S>
export function createReducer<S>(initState, builderFn) {
    const opts: _ReducerOpts = {
        reducers: {},
        matchers: [],
        default: (x) => x
    }
    builderFn(createReducerBuilderFn(opts))

    opts.matchers = opts.matchers.reverse()
    const keys = Object.keys
    return (state=initState, action) => {
        let index = keys.length
        let found = false
        while(index--) {
            if (!opts.reducers[action.type]) continue
            state = opts.reducers[action.type](state, action)
            found = true
        }
        index = opts.matchers.length
        while(index--) {
            if (!opts.matchers[index].matcher(action)) continue
            state = opts.matchers[index].reducer(state, action)
            found = true
        }
        return found ? state : opts.default(state)
    }
}

interface ActionHelper<P, T extends string> {
    (input:T): PayloadAction<P>
    type: T
    toString: () => T
    match: (action: AnyAction) => boolean
}
type PrepareFn<P> = (input: P) => object

export function createAction<P, T extends string>(type:T): ActionHelper<P,T>
export function createAction<P, T extends string>(type:T, prepare: PrepareFn<P>): ActionHelper<P,T>
export function createAction<P, T extends string>(type: T, prepare?:PrepareFn<P>) {
    const res = (payload: T) => {
        if (prepare) return {
            type,
            ...prepare(payload as any) as any
        }
        return {type, payload}
    }
    res.toString = () => type
    res.type = type
    res.match = (action:AnyAction) => action.type === type

    return res
}

type CreateSliceOptions<S> = {
    initialState: S
    name: string
    reducers: {[key:string]: Reducer<S>},
    builder?: BuilderFn
}
type CreateSliceResponse<S> = {
    name: string
    getInitialState: () => S
    actions
    caseReducers
    reducer
}

export function createSlice<S>(opts: CreateSliceOptions<S>): CreateSliceResponse<S>{
    const mapReducer = createReducer(opts.initialState, opts.reducers)
    let builderReducer: Reducer<S> = (x) => x
    
    const actions = {}
    const caseReducers = {...opts.reducers}
    
    Object.keys(opts.reducers).forEach(key => {
        actions[key] = createAction(key, (input) => {
            return { name: opts.name, payload: input }
        })
    })

    if (opts.builder) {
        builderReducer = createReducer(opts.initialState, opts.builder)
        opts.builder({
            addCase: function(type, reducer) {
                actions[type] = createAction(type, (input) => {
                    return { name: opts.name, payload: input }
                })
                caseReducers[type] = reducer
                return this
            },
            addMatcher: function() { return this },
            addDefaultCase: function() { return this}
        })
    }

    return {
        name: opts.name,
        getInitialState: () => opts.initialState,
        actions,
        caseReducers,
        reducer: (state, action) => {
            if (action.name !==  opts.name) return state
            state = mapReducer(state, action)
            state = builderReducer(state, action)
            return state
        }
    }
}

export function createAsyncThunk() {
    
}