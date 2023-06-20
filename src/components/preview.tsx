import { useEffect, useRef } from 'react';
import './preview.css';

interface PreviewProps {
    code: string;
    errorStatus:string
}
const html = `
<html>
    <head>
        <style>
            html {
                background-color: white;
                color: red;
            }
        </style>
    </head>
    <body>
        <div id="root">
            <script>
                const handleError = (err) => {
                    const root = document.querySelector('#root');
                    root.innerHTML = '<div style="color:red;">' + err + '</div>';
                    console.log(err)
                }
                window.addEventListener('error', (event) => {
                    event.preventDefault();
                    handleError(event.error);
                  })
                window.addEventListener('message', (event) => {
                    try {
                        eval(event.data)
                    } catch (err) {
                        handleError(err)
                    }
                });
            </script>
        </div>
    </body>
</html>
    `;
    window.addEventListener('error', (event) => {
      console.log(event)
    })
const Preview: React.FC<PreviewProps> = ({ code,errorStatus }) => {
    const iFrame = useRef<any>();

    useEffect(() => {
        iFrame.current.srcdoc = html;
        setTimeout(() => {
            iFrame.current.contentWindow.postMessage(code, '*');
        },50)
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe
                title="preview"
                ref={iFrame}
                sandbox="allow-scripts"
                srcDoc={html}
            />
            {errorStatus && <div className='preview-error'>{errorStatus}</div>}
        </div>
    );
};

export default Preview;
