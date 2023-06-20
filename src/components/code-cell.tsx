import { useEffect, useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import bundler from '../bundler';

// 4) Create a component
const CodeCell = () => {
    const [code, setCode] = useState('');
    const [errorStatus, setErr] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            // try {
                const output = await bundler(input);
                setCode(output.code);
                setErr(output.err)
            // } catch (e) {
            //     if (e instanceof Error) {
            //         console.log(e.message);
            //         setCode(e.message);
            //     }
            // }
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, [input]);
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
                        initialValue="//import ..."
                        onChange={(value) => setInput(value)}
                    />
                </Resizable>
                <Preview code={code} errorStatus={errorStatus}/>
            </div>
        </Resizable>
    );
};

export default CodeCell;
