import { cellDeleted, cellMoved } from '../../state/feature/cellSlice';
import { useAppDispatch } from '../../state/store';
import './action-bar.css'

interface Props {
    id: string;
}

const ActionBar: React.FC<Props> = ({ id }) => {
    const dispatch = useAppDispatch();
    return (
        <div className='action-bar'>
            <button
                className="button is-primary is-small"
                onClick={() => {
                    dispatch(cellMoved({ id: id, direction: 'up' }));
                }}
            >
                <span>
                    <i className="fas fa-arrow-up"></i>
                </span>
            </button>
            <button
                className="button is-primary is-small"
                onClick={() => {
                    dispatch(cellMoved({ id: id, direction: 'down' }));
                }}
            >
                <span>
                    <i className="fas fa-arrow-down"></i>
                </span>
            </button>
            <button
                className="button is-primary is-small"
                onClick={() => {
                    dispatch(cellDeleted(id));
                }}
            >
                <span>
                    <i className="fas fa-times"></i>
                </span>
            </button>
        </div>
    );
};

export default ActionBar;
