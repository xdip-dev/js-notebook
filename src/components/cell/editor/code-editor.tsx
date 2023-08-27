import './code-editor.css'
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import prettier from 'prettier';
import parser from 'prettier/parser-babel'
import { useRef } from "react";
// import MonacoJSXHighlighter from 'monaco-jsx-highlighter';
// import {parse} from "@babel/parser";
// import traverse from "@babel/traverse";
// import monaco from 'monaco-editor';

interface CodeEditorProps {
    initialValue:string;
    onChange(value:string):void
}
const CodeEditor:React.FC<CodeEditorProps> = ({initialValue,onChange}) => {

    const editorRef = useRef<any>()
    
    const onMount:OnMount = (editor,monaco) => {
        editorRef.current = editor

            // TODO
    //     const monacoJSXHighlighter = new MonacoJSXHighlighter(
    //     monaco, parse, traverse, monaco
    //     );
    //  // Activate highlighting (debounceTime default: 100ms)
    //     monacoJSXHighlighter.highlightOnDidChangeModelContent();
    //  // Activate JSX commenting
    //     monacoJSXHighlighter.addJSXCommentCommand();
      
    }

    const onFormatClick = () => {
      const unformatted = editorRef.current.getValue()
      editorRef.current.getValue()

      
      const formatted = prettier.format(unformatted,{
          parser:'babel',
          plugins:[parser],
          useTabs:false,
          semi:true,
          singleQuote:true
        }).replace(/\n$/,'')
        
        editorRef.current.setValue(formatted)
    }

    return (
        <div className='editor-wrapper'>
            <button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
        <MonacoEditor
            value={initialValue}
            onMount={onMount}
            onChange={(value) => onChange(value as string)}
            theme='vs-dark'
            language="javascript"
            height="100%"
            options={{

                wordWrap: "on",
                minimap: { enabled: false },
                showUnused: false,
                folding:false,
                lineNumbersMinChars:3,
                fontSize:16,
                scrollBeyondLastLine:false,
                automaticLayout:true,

            }}
        />
        </div>
    );
};

export default CodeEditor;
