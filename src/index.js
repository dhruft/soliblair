import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

//import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const opts = {
  enableMouseEvents: true
}

root.render(
  <DndProvider backend={TouchBackend} options={opts}>
      <React.StrictMode>
          <App />
      </React.StrictMode>
  </DndProvider>
);
