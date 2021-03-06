import React from 'react';
import { useScrollerContext } from '../../hooks/useScrollerContext';
import { SectionProvider } from '../../context/SectionContext';
import posed from 'react-pose';

interface Props {
    duration: number;
    name: string;
}

const AnimatedSection = posed.div({
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
});

export const Section: React.FC<Props> = ({ children, duration, name }) => {
    // Add the section
    const { addSection, isSectionVisible } = useScrollerContext();
    addSection(name, duration);

    const [isActive, relativePosition] = isSectionVisible(name);
    const absolutePosition = duration * relativePosition;

    return (
        <AnimatedSection style={{ zIndex: isActive ? 10 : 0 }} className="sticky-section" pose={isActive ? 'visible' : 'hidden'}>
            <SectionProvider relativePosition={relativePosition} absolutePosition={absolutePosition}>
                {children}
            </SectionProvider>
        </AnimatedSection>
    );
};
