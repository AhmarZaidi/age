// import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';


// function App() {

//     return (
//         <div id="App">
//             <div>
//                 <img src={logo} id="logo" alt="logo"/>
//             </div>
//         </div>
//     )
// }

// export default App;

// #########################################################################

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import './static/style.css';
import './static/navbar-fixed-left.css';
import MainPage from './pages/Main/MainPage';

import './App.css';

function App() {
    return(
        <div id="App">
            {/* <React.StrictMode> */}
                <MainPage />
            {/* </React.StrictMode> */}
        </div>
    )
}

export default App;