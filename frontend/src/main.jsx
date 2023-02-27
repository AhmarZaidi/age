// import React from 'react'
// import {createRoot} from 'react-dom/client'
// import './style.css'
// import App from './App'

// const container = document.getElementById('root')

// const root = createRoot(container)

// root.render(
//     <React.StrictMode>
//         <App/>
//     </React.StrictMode>
// )

// ######################################################################################


// import React from 'react';
// import {createRoot} from 'react-dom/client'
// import './style.css';
// import App from './App';

// const container = document.getElementById('root')
// const root = createRoot(container)


// // import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import store from './app/store';



// root.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <App/>
//         </Provider>
//     </React.StrictMode>
//     // <h1>sdkhbvhkbkhbdkv skv shkd vhk hks dhv</h1>
// )

// // ReactDOM.render(
// //     <h1>kebsv</h1>,
// //     document.getElementById('root')
// // );
    
// //     //   <Provider store={store}>
// //     //     <App />
// //     //   </Provider>,



// ######################################################################################



import React from 'react'
import {createRoot} from 'react-dom/client'
import './style.css'
import App from './App'

const container = document.getElementById('root')

const root = createRoot(container)

import { Provider } from 'react-redux';
import store from './app/store';

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
)
