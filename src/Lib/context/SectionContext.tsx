import React from 'react';

export interface SectionContext {
    relativePosition: number;
}

// Default context, SHOULDN'T HAPPEN
const voidContext: SectionContext = {
    relativePosition: 0,
};

export const SectionContextValue = React.createContext<SectionContext>(voidContext);

interface Props {
    relativePosition: number;
}

export const SectionProvider: React.FC<Props> = ({ children, relativePosition }) => {
    const themeHandler: SectionContext = {
        relativePosition,
    };

    return <SectionContextValue.Provider value={themeHandler}>{children}</SectionContextValue.Provider>;
};
