export type EntityId = number | string

export type Comparer<T> = (a: T, b: T) => number

export type IdSelector<T> = (model: T) => EntityId

export interface DictionaryNum<T> {
  [id: number]: T | undefined
}

export interface Dictionary<T> extends DictionaryNum<T> {
  [id: string]: T | undefined
}

export type Update<T> = { id: EntityId; changes: Partial<T> }

export interface EntityState<T> {
  ids: EntityId[]
  entities: Dictionary<T>
}

export interface EntityDefinition<T> {
  selectId?: IdSelector<T>
  sortComparer?: false | Comparer<T>
}

type StateSelectorFn<T> = (state: any) => EntityState<T>



export function createEntityAdapter<T>(opts:EntityDefinition<T>={}) {
    const selectId: IdSelector<T> = opts.selectId ? opts.selectId : (x: any) => (x.id)

    return {
        getInitialState: () => {},
        /**
         * accepts a single entity, and adds it if it's not already present
         */
        addOne: <S extends EntityState<T>>(state: S, action: PayloadAction<T>) => {
            const id = selectId(action.payload)
            if (state.entities[id]) return state
            return {
                ids: [...state.ids, id],
                entities: {...state.entities, [id]: action.payload }
            }
        },
        /**
         * accepts an array of entities or an object in the shape of `Record<EntityId, T>`, and adds them if not already present
         */
        addMany: <S extends EntityState<T>>(state: S, action: PayloadAction<T[] | {[key:string]:T}>) => {
            const keys = Object.keys(action.payload)
            let index = keys.length
            let found = false
            while(index--) {
                const id = selectId(action.payload[index])
                if (state.entities[id]) continue
                state.ids.push(id)
                state.entities[id] = action.payload[id]
                found = true
            }
            if (!found) return state
            return {
                ids: [...state.ids],
                entities: {...state.entities}
            }
        },
        /**
         * accepts an "update object" containing an entity ID and an object containing one or more
         * new field values to update inside a changes field,
         * and performs a shallow update on the corresponding entity
         */
        updateOne: <S extends EntityState<T>>(store:S, action: PayloadAction<Update<T>>) => {},
        /**
         * accepts an array of update objects, and performs shallow updates on all corresponding entities
         */
        updateMany: <S extends EntityState<T>>(store:S, action: PayloadAction<Update<T>[]>) => {
            let index = 0
            let found = false
            while (index < action.payload.length) {
                const id = selectId(action.payload[index] as T)
                index++
                if (!store.entities[id]) continue
                store.entities[id] = {...store.entities[id], ...action.payload[id]}
                found = true
            }
            return found ? {
                ids: [...store.ids],
                entities: {...store.entities}
            } : store
        },
        upsertOne: () => {},
        upsertMany: () => {},
        setAll: () => {},
        removeOne: () => {},
        removeMany: () => {},
        /**
         * removes all entities from the entity state object
         */
        removeAll: (state, action) => {
            return { ids: [], entities: []}
        },
        /**
         * a set of selectors that know how to read the contents of an entity state object
         */
        getSelectors: (stateSelector?:StateSelectorFn<T>) => {
            const _selector:StateSelectorFn<T> = stateSelector || ((x) => x)
            return {
                /**
                 * returns the `state.ids` array
                 */
                selectIds: (state) => {
                    return _selector(state).ids
                },
                /**
                 * returns the `state.entities` lookup table
                 */
                selectEntities: (state) => {
                    return _selector(state).entities
                },
                /**
                 * maps over the `state.ids` array, and returns an array of entities in the same order
                 */
                selectAll: (state) => {
                    const myState = _selector(state)
                    return myState.ids.map(id => {
                        return myState[id]
                    })
                },
                /**
                 * returns the total number of entities being stored in this state
                 */
                selectTotal: (state) => {
                    return _selector(state).ids.length
                },
                /**
                 * given the state and an entity ID, returns the entity with that ID or undefined
                 */
                selectById: (state, id:EntityId):T|undefined => {
                    return _selector(state).entities[id]
                }
            }
        } 
    }
}