import React from 'react';
import { Scroller } from '../../Lib/components/Scroller/Scroller';
import { Section } from '../../Lib/components/Section/Section';
import { useSectionContext } from '../../Lib/hooks/useSectionContext';
import './ScrollerPart.scss';

const FirstSection: React.FC = () => {
    const { relativePosition } = useSectionContext();
    const percent: string = (relativePosition * 100).toFixed(2);

    return (
        <div className="section first-section">
            <p>first section!</p>
            <p>{percent}% done</p>
        </div>
    );
};

const SecondSection: React.FC = () => {
    const { relativePosition } = useSectionContext();

    return (
        <div className="section second-section">
            <p>second section!</p>
            <div style={{ backgroundColor: 'white', height: 50, width: '100%' }}>
                <div style={{ backgroundColor: 'red', height: '100%', width: `${relativePosition * 100}%` }}></div>
            </div>
        </div>
    );
};

const ThirdSection: React.FC = () => {
    const { relativePosition } = useSectionContext();
    const ang: string = `${relativePosition * 90}deg`;

    return (
        <div className="section third-section">
            <p>third section!</p>
            <div style={{ backgroundColor: 'white', height: 100, width: 100, transform: `rotate(${ang})` }}></div>
        </div>
    );
};

export const ScrollerPart: React.FC = () => {
    return (
        <Scroller>
            <Section name="first-section" duration={1000}>
                <FirstSection />
            </Section>
            <Section name="second-section" duration={2000}>
                <SecondSection />
            </Section>
            <Section name="third-section" duration={500}>
                <ThirdSection />
            </Section>
        </Scroller>
    );
};
