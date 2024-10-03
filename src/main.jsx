import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {store} from "./Redux/store.jsx";
import './index.css'
import {Provider} from "react-redux";
import {SnackbarProvider} from "notistack";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <Provider store={store}>
           <SnackbarProvider maxSnack = {3}>
                <App/>
           </SnackbarProvider>
       </Provider>
  </React.StrictMode>,
)
