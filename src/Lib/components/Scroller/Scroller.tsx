import React from 'react';
import { ScrollerProvider } from '../../context/ScrollerContext';
import { useScrollerContext } from '../../hooks/useScrollerContext';
import './Scroller.scss';

export const Scroller: React.FC = ({ children }) => {
    return (
        <ScrollerProvider>
            <SectionsContainer>{children}</SectionsContainer>
        </ScrollerProvider>
    );
};

const SectionsContainer: React.FC = ({ children }) => {
    const { getHeight, scrollerRef } = useScrollerContext();
    const height: number = getHeight();

    return (
        <div ref={scrollerRef} className="scroller-container" style={{ height }}>
            {children}
        </div>
    );
};
