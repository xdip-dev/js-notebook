import './text-editor.css';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import { Cell } from '../../state/cell';
import { useAppDispatch } from '../../state/store';
import { cellUpdated } from '../../state/feature/cellSlice';

interface TextEditorProps {
    cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            // console.log(event.target);

            if (
                ref.current &&
                event.target &&
                ref.current.contains(event.target as Node)
            ) {
                return;
            }
            setEditing(false);
        };
        document.addEventListener('click', listener, { capture: true });
        return () => {
            document.removeEventListener('click', listener, { capture: true });
        };
    }, []);
    if (editing) {
        return (
            <div className="text-editor" ref={ref}>
                <MDEditor
                    value={cell.content || 'Click to edit'}
                    onChange={(value) =>
                        dispatch(cellUpdated({ id: cell.id, content: value || '' }))
                    }
                />
            </div>
        );
    }
    return (
        <div
            className="text-editor card"
            onClick={() => {
                setEditing(true);
            }}
        >
            <div className="card-content">
                <MDEditor.Markdown
                    source={cell.content}
                    style={{ whiteSpace: 'pre-wrap' }}
                />
            </div>
        </div>
    );
};

export default TextEditor;
