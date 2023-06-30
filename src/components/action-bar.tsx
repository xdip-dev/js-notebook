import { cellDeleted, cellMoved } from '../state/feature/cellSlice';
import { useAppDispatch } from '../state/store';

interface Props {
    id: string;
}

const ActionBar: React.FC<Props> = ({ id }) => {
    const dispatch = useAppDispatch();
    return (
        <div>
            <button
                onClick={() => {
                    dispatch(cellMoved({ id: id, direction: 'up' }));
                }}>Up</button>
            <button onClick={() => {
                    dispatch(cellMoved({ id: id, direction: 'down' }));
                }}>Down</button>
            <button onClick={() => {
                    dispatch(cellDeleted(id));
                }}>Delete</button>
        </div>
    );
};

export default ActionBar;
