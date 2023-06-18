import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from "esbuild-wasm";
import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

// 2) Get a reference to the div with ID root
const el = document.getElementById("root");

// 3) Tell React to take control of that element
const root = ReactDOM.createRoot(el!);

// 4) Create a component
const App = () => {
    const ref = useRef<any>();
    const iFrame = useRef<any>();
    const [input, setInput] = useState("");

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
        });
    };

    useEffect(() => {
        startService();
    }, []);
    const onClick = async () => {
        if (!ref.current) {
            return;
        }

        iFrame.current.srcdoc = html;
        const res = await ref.current.build({
            entryPoints: ["index.js"],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
                "process.env.NODE_ENV": '"production"',
                global: "window",
            },
        });

        // setCode(res.outputFiles[0].text);
        iFrame.current.contentWindow.postMessage(res.outputFiles[0].text, "*");
    };
    const html = `
    <html>
    <head>
        <div id="root">
            <script>
                window.addEventListener('message',(event) => {
                    try {
                        eval(event.data)
                    } catch (err) {
                        const root = document.querySelector('#root');
                        root.innerHTML = '<div>' + err + '</div>';
                    }
                })
            </script>
        </div>
    </head>
    </html>
    `;

    return (
        <div>
            <CodeEditor initialValue="import ..." onChange={(value) => setInput(value)} />
            <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <iframe title="preview" ref={iFrame} sandbox="allow-scripts" srcDoc={html}></iframe>
        </div>
    );
};

// 5) Show the component on the screen
root.render(<App />);
