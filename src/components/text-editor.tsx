import './text-editor.css'
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
interface Props {}
const TextEditor: React.FC<Props> = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [value, setValue] = useState('# Header');
    const [editing, setEditing] = useState(false);

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
                <MDEditor value={value} onChange={(v)=>setValue(v || '')} />
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
            <div className='card-content'>

            <MDEditor.Markdown
                source={value}
                style={{ whiteSpace: 'pre-wrap' }}
            />
            </div>
        </div>
    );
};

export default TextEditor;
