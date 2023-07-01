// import { ActionType } from '../action-types';
// import { Action } from '../actions';
import { Cell, CellTypes } from '../cell';
import { createSlice,  PayloadAction } from '@reduxjs/toolkit';
import { Direction } from '../direction';

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
    initialState,
    reducers: {
        cellUpdated(
            state,
            action: PayloadAction<{ id: string; content: string }>
        ) {
            const { id, content } = action.payload;
            state.data[id].content = content;
        },
        cellDeleted(state, action: PayloadAction<string>) {
            delete state.data[action.payload];
            state.order = state.order.filter((id) => id !== action.payload);
        },
        cellMoved(
            state,
            action: PayloadAction<{ id: string; direction: Direction }>
            ) {
            const { direction } = action.payload;
            const index = state.order.findIndex(
                (id) => id === action.payload.id
            );
            const targetIndex = direction === 'up' ? index - 1 : index + 1;
            if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                return;
            }
            state.order[index] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id;

        },
        cellInsertedBefore(
            state,
            action: PayloadAction<{ id: string | null; type: CellTypes }>
        ) {
            const cell: Cell = {
                content: '',
                type: action.payload.type,
                id: randomId(),
            };

            state.data[cell.id] = cell;
            const index = state.order.findIndex(
                (id) => id === action.payload.id
            );
            if (index < 0) {
                state.order.push(cell.id);
            } else {
                state.order.splice(index, 0, cell.id);
            }
        },
    },
});

const randomId = () => {
    return Math.random().toString(36).substring(2, 5);
};

export const { cellDeleted, cellInsertedBefore, cellMoved, cellUpdated } =
    cellReducer.actions;

export default cellReducer.reducer;

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
