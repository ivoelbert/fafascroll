import React from 'react';
import { ScrollerProvider } from '../../context/ScrollerContext';
import { useScrollerContext } from '../../hooks/useScrollerContext';
import './Scroller.scss';

interface ScrollerProps {
    className?: string;
}

export const Scroller: React.FC<ScrollerProps> = ({ children, className = '' }) => {
    return (
        <ScrollerProvider>
            <SectionsContainer className={className}>{children}</SectionsContainer>
        </ScrollerProvider>
    );
};

interface SectionsContainerProps {
    className: string;
}

const SectionsContainer: React.FC<SectionsContainerProps> = ({ children, className }) => {
    const { getHeight, scrollerRef } = useScrollerContext();
    const height: number = getHeight();

    return (
        <div ref={scrollerRef} className={`fafascroller-container ${className}`} style={{ height }}>
            {children}
        </div>
    );
};
