import { configureStore, combineReducers } from "@reduxjs/toolkit"
import bookSlice from "./features/bookSlice" 
import { useSelector, TypedUseSelectorHook } from "react-redux"
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import createWebStorage from "redux-persist/es/storage/createWebStorage"
import { WebStorage } from "redux-persist/lib/types"

function createPersistStorage(): WebStorage {
    const isServer = typeof window === 'undefined';
    const isTest = process.env.NODE_ENV === 'test';

    if (isServer || isTest) {
        return {
            getItem() { return Promise.resolve(null); },
            setItem() { return Promise.resolve(); },
            removeItem() { return Promise.resolve(); }
        };
    }
    const createWebStorage = require('redux-persist/es/storage/createWebStorage').default;
    return createWebStorage('local');
}

const storage = createPersistStorage();
const persistConfig = {
    key: "rootPersist",
    storage
}

const rootReducer = combineReducers({ bookSlice })
const reduxPersistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: reduxPersistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector