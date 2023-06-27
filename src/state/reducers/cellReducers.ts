// import { ActionType } from '../action-types';
// import { Action } from '../actions';
import { Cell } from '../cell';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CellsStates {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell;
    };
}

const initialState: CellsStates = {
    loading: false,
    error: null,
    order: [],
    data: {},
};

export const cellReducer = createSlice({
    name: 'cellReducer',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      cellMoved: state => {
        state.loading=true
      },
      cellDeleted: state => {
        state.loading=true
      },
      cellUpdated: state => {
        state.loading=true
      },
      cellInsertedBefore: state => {
        state.loading=true
      },

    //   // Use the PayloadAction type to declare the contents of `action.payload`
    //   incrementByAmount: (state, action: PayloadAction<number>) => {
    //     state.value += action.payload
    //   }
    }
})

export const {cellDeleted,cellInsertedBefore,cellMoved,cellUpdated} = cellReducer.actions

export default cellReducer.reducer

// const cellsReducer = (
//     state: CellsStates = initialState,
//     action: Action
// ): CellsStates => {
//     switch (action.type) {
//         case ActionType.UPDATE_CELL:
//             return state;
//         case ActionType.DELETE_CELL:
//             return state;
//         case ActionType.MOVE_CELL:
//             return state;
//         case ActionType.INSERT_CELL_BEFORE:
//             return state;
//         default:
//             return state;
//     }
// };



