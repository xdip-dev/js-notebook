import { cellInsertedBefore } from "../state/feature/cellSlice";
import { useAppDispatch, useAppSelector } from "../state/store";
import CellListItem from "./cell-list-item";


const CellList: React.FC = () => {
    const cells = useAppSelector(({cell:{order,data}}) => {
        return order.map((id) => {
            return data[id]
        })
    })
    const dispatch = useAppDispatch()

    const test =  () => {
        dispatch(cellInsertedBefore({id:null,type:"code"}))
    }
    const test2 =  () => {
        dispatch(cellInsertedBefore({id:null,type:"text"}))
    }


    const renderedCells = cells.map(cell => <CellListItem key={cell.id} cell={cell} />)

    return <div>
        <button onClick={test}>code</button>
        <button onClick={test2}>text</button>
        {renderedCells}
        </div>;
};

export default CellList;
