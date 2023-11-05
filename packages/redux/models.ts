type Reducer<S> = (state:S, action) => S
type ListenerFn = () => void
interface Action {
    type: string
}
interface AnyAction extends Action {
    [key:string]: any
}
interface PayloadAction<P> extends AnyAction {
    payload: P
}