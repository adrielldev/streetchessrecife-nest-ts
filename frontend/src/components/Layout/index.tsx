import React, { ReactComponentElement, ReactElement, ReactNode } from 'react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  return (
    <div>
        <h1>Título da página</h1>
        <ToastContainer />

    </div>
  )
}

export default Layout