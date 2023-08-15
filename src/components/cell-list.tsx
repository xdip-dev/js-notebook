import { Fragment } from "react";
import { useAppSelector } from "../state/store";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";
import './cell-list.css'


const CellList: React.FC = () => {
    const cells = useAppSelector(({cell:{order,data}}) => {
        return order.map((id) => {
            return data[id]
        })
    })

    const renderedCells = cells.map(cell => {
        if (cell) {
            return <Fragment key={cell.id}>
            <CellListItem  cell={cell} />
            <AddCell previousCellId={cell.id}/>
            </Fragment>
        } 
    })

    return <div className="cell-list">
        <AddCell forceVisible={cells.length ===0} previousCellId={null}/>
        {renderedCells}
        </div>;
};

export default CellList;
