import { useState } from 'react';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { Button } from 'primereact/button';
import './App.css'

function App() {

  return (
    <>
        <Button style={{ backgroundColor: 'var(--pink-500)'}} label="Submit" />
        <Button label="Success" severity="success" raised />
    </>
  )
}

export default App
