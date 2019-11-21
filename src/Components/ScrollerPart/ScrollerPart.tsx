import React from 'react';
import { Scroller } from '../../Lib/components/Scroller/Scroller';
import { Section } from '../../Lib/components/Section/Section';
import { useScrollPosition } from '../../Lib/hooks/useScollPosition';
import { Phone } from '../Phone/Phone';
import './ScrollerPart.scss';

const FirstSection: React.FC = () => {
    const { relativePosition } = useScrollPosition();

    const style: React.CSSProperties = {
        opacity: relativePosition,
    }

    return (
        <div className="section first-section">
            <div style={style} className="white-backdrop"></div>
            <h1>0xFAFAFA</h1>
        </div>
    );
};

export const ScrollerPart: React.FC = () => {
    return (
        <Scroller className="scroller-container">
            <Section name="first-section" duration={1000}>
                <FirstSection />
            </Section>
            <Section name="third-section" duration={3000}>
                <Phone />
            </Section>
        </Scroller>
    );
};
