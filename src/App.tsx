import React from 'react';
import { ScrollerPart } from './Components/ScrollerPart/ScrollerPart';
import { Closer } from './Components/Closer/Closer';
import './App.scss';

const App: React.FC = () => {
    return (
        <div>
            <ScrollerPart />
            <Closer />
        </div>
    );
};

export default App;
