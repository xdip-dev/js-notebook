import { useEffect, useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import bundler from '../bundler';
import { Cell } from '../state/cell';
import { useAppDispatch } from '../state/store';
import { cellUpdated } from '../state/feature/cellSlice';


interface CodeCellProps {
    cell:Cell
}

const CodeCell:React.FC<CodeCellProps> = ({cell}) => {
    const [code, setCode] = useState('');
    const [errorStatus, setErr] = useState('');
    const dispatch = useAppDispatch()

    useEffect(() => {
        const timer = setTimeout(async () => {
                const output = await bundler(cell.content);
                setCode(output.code);
                setErr(output.err)

        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, [cell.content]);
    return (
        <Resizable direction="vertical">
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={(value) => dispatch(cellUpdated({id:cell.id,content:value}))}
                    />
                </Resizable>
                <Preview code={code} errorStatus={errorStatus}/>
            </div>
        </Resizable>
    );
};

export default CodeCell;
