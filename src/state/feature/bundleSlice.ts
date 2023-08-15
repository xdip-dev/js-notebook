import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface BundleState {
    [key: string]: {
        loading: boolean;
        code: string;
        err:string;
    } | undefined
}

interface BundleProperty{
    code:string;
    err:string;
}

const initialState: BundleState = {};

export const bundleReducer = createSlice({
    name: 'bundleReducer',
    initialState,
    reducers:{
        bundleStarted: (state, action:PayloadAction<{cellId:string}>) => {
            state[action.payload.cellId] = {
                loading: true,
                code: '',
                err: '',
            }
        },
        bundleComplete: (state, action:PayloadAction<{cellId:string, bundle:BundleProperty}>) => {
            state[action.payload.cellId] = {
                loading: false,
                code :action.payload.bundle.code,
                err:action.payload.bundle.err,
            }
        }
    }

})

export const { bundleStarted, bundleComplete } = bundleReducer.actions;
export default bundleReducer.reducer;