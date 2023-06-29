import { configureStore } from "@reduxjs/toolkit";
import cellReducer from './feature/cellSlice'
import { useDispatch, useSelector } from 'react-redux'
import type {TypedUseSelectorHook} from 'react-redux'

export const store = configureStore({ 
    reducer:{
        cell:cellReducer
    } })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
