import { editor } from 'monaco-editor';
import './code-editor.css'
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import prettier from 'prettier';
import parser from 'prettier/parser-babel'
import { useRef } from "react";
// import codeShift from 'jscodeshift';
// import Highlighter from 'monaco-jsx-highlighter'

interface CodeEditorProps {
    initialValue:string;
    onChange(value:string):void
}
// EditorDidMount
const CodeEditor:React.FC<CodeEditorProps> = ({initialValue,onChange}) => {

    const editorRef = useRef<any>()

    const onMount:OnMount = (editor,monaco) => {
      editorRef.current = editor
      
    }

    const onEditorDidMount =(getValue:()=> string,monacoEditor:any) => {
        editorRef.current = monacoEditor
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
        })
        monacoEditor.getModel()?.updateOptions({tabSize:2})

        // const highlighter = new Highlighter(
        //     //@ts-ignore
        //     window.monaco,
        //     codeShift,
        //     monacoEditor
        // );

        // highlighter.highLightOndidChangeModelContent();

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
            height="500px"
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
