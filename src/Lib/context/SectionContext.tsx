import React from 'react';

export interface SectionContext {
    relativePosition: number;
    absolutePosition: number;
}

// Default context, SHOULDN'T HAPPEN
const voidContext: SectionContext = {
    relativePosition: 0,
    absolutePosition: 0,
};

export const SectionContextValue = React.createContext<SectionContext>(voidContext);

interface Props {
    relativePosition: number;
    absolutePosition: number;
}

export const SectionProvider: React.FC<Props> = ({ children, relativePosition, absolutePosition }) => {
    const themeHandler: SectionContext = {
        relativePosition,
        absolutePosition,
    };

    return <SectionContextValue.Provider value={themeHandler}>{children}</SectionContextValue.Provider>;
};
