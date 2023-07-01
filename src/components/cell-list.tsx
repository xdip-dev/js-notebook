import { Fragment } from "react";
import { useAppSelector } from "../state/store";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";


const CellList: React.FC = () => {
    const cells = useAppSelector(({cell:{order,data}}) => {
        return order.map((id) => {
            return data[id]
        })
    })

    const renderedCells = cells.map(cell => {
        if (cell) {
            return <Fragment key={cell.id}>
            <AddCell nextCellId={cell.id}/>
            <CellListItem  cell={cell} />
            </Fragment>
        } 
    })

    return <div>
        {renderedCells}
        <AddCell forceVisible={cells.length ===0} nextCellId={null}/>
        </div>;
};

export default CellList;
