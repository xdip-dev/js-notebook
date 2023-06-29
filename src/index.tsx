import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom/client';
import CodeCell from './components/code-cell';
import { Provider } from 'react-redux';
import { store } from './state/store';
import TextEditor from './components/text-editor';

// 2) Get a reference to the div with ID root
const el = document.getElementById('root');

// 3) Tell React to take control of that element
const root = ReactDOM.createRoot(el!);

// 4) Create a component
const App = () => {
    return (
        <Provider store={store}>
            <div>
                {/* <CodeCell/> */}
                <TextEditor />
            </div>
        </Provider>
    );
};

// 5) Show the component on the screen
root.render(<App />);
