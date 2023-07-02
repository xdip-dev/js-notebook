import { cellInsertedAfter } from '../state/feature/cellSlice';
import { useAppDispatch } from '../state/store';
import './add-cell.css';
interface Props {
    previousCellId: string | null;
    forceVisible?:boolean 
}

const AddCell: React.FC<Props> = ({ previousCellId,forceVisible }) => {
    const dispatch = useAppDispatch();

    return (
        <div className={`add-cell ${forceVisible && 'force-visible'}`}>
            <div className="add-button">
                <button
                    className="button is-rounded is-primary is-small"
                    onClick={() =>
                        dispatch(
                            cellInsertedAfter({ id: previousCellId, type: 'code' })
                        )
                    }
                >
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>Code</span>
                </button>
                <button
                    className="button is-rounded is-primary is-small"
                    onClick={() =>
                        dispatch(
                            cellInsertedAfter({ id: previousCellId, type: 'text' })
                        )
                    }
                >
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>Text</span>
                </button>
            </div>
            <div className="divider"></div>
        </div>
    );
};

export default AddCell;
