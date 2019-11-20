import React from 'react';
import { ScrollerPart } from './Components/ScrollerPart/ScrollerPart';
import { Introduction } from './Components/Introduction/Introduction';
import { Closer } from './Components/Closer/Closer';
import './App.scss';

const App: React.FC = () => {
    return (
        <div>
            <Introduction />
            <ScrollerPart />
            <Closer />
        </div>
    );
};

export default App;
