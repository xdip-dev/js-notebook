import { ActionType } from "../action-types";
import { CellTypes } from "../cell";

export interface MoceCellAction {
    type:ActionType.MOVE_CELL,
    payload:{
        id:string,
        direction:'up'|'down'
    }

}

export interface DeleteCellAction {
    type:ActionType.DELETE_CELL,
    payload:string

}

export interface InsertCellBefore {
    type:ActionType.INSERT_CELL_BEFORE,
    payload:{
        id:string,
        type: CellTypes
    }
}

export interface UpdateCell{
    type:ActionType.UPDATE_CELL,
    payload:{
        id:string,
        content:string
    }
}

export type Action =
    MoceCellAction
    | DeleteCellAction
    | InsertCellBefore
    | UpdateCell