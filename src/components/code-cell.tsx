import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import bundler from '../bundler';
import { Cell } from '../state/cell';
import { useAppDispatch, useAppSelector } from '../state/store';
import { cellUpdated } from '../state/feature/cellSlice';
import { bundleComplete, bundleStarted } from '../state/feature/bundleSlice';
import './code-cell.css';
import { useCumulativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const dispatch = useAppDispatch();
    const bundle = useAppSelector((state) => state.bundler[cell.id]);
    const cumulativeCode = useCumulativeCode(cell.id);

    useEffect(() => {
        const timer = setTimeout(async () => {
            dispatch(bundleStarted({ cellId: cell.id }));
            const output = await bundler(cumulativeCode);
            dispatch(
                bundleComplete({
                    cellId: cell.id,
                    bundle: output,
                })
            );
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cell.id, cumulativeCode, dispatch]);

    return (
        <Resizable direction="vertical">
            <div
                style={{
                    height: 'calc(100% - 10px)',
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={(value) =>
                            dispatch(
                                cellUpdated({ id: cell.id, content: value })
                            )
                        }
                    />
                </Resizable>
                <div className="progress-wrapper">
                    {!bundle || bundle?.loading ? (
                        <div className="progress-cover">
                            <progress
                                className="progress is-small is-primary"
                                max="100"
                            >
                                Loading
                            </progress>
                        </div>
                    ) : (
                        <Preview
                            code={bundle?.code}
                            errorStatus={bundle?.err}
                        />
                    )}
                </div>
            </div>
        </Resizable>
    );
};

export default CodeCell;
