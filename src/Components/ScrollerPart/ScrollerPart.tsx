import React from 'react';
import { Scroller } from '../../Lib/components/Scroller/Scroller';
import { Section } from '../../Lib/components/Section/Section';
import { useScrollPosition } from '../../Lib/hooks/useScollPosition';
import { tabulate, animationTiming } from '../../Lib/utils/utils';
import './ScrollerPart.scss';

interface ShadowProps {
    scale: number;
    transparent: boolean;
}
const Shadow: React.FC<ShadowProps> = ({ scale, transparent }) => {
    return <div className="shadow" style={{ backgroundColor: transparent ? '#2b2b2b50' : '#2b2b2b', transform: `translateY(-50%) scaleY(${scale})` }}></div>;
};

const FirstSection: React.FC = () => {
    const { relativePosition } = useScrollPosition();
    const shadowCount = 5;

    return (
        <div className="section first-section">
            <h1>0xFAFAFA</h1>
            {tabulate(shadowCount, (idx: number) => {
                const delta = 1 / shadowCount;
                const timing = animationTiming(relativePosition, delta * idx, 1);

                return <Shadow transparent={idx !== shadowCount - 1} key={idx} scale={timing} />;
            })}
        </div>
    );
};

const SecondSection: React.FC = () => {
    const { relativePosition } = useScrollPosition();

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
    const { relativePosition } = useScrollPosition();
    const ang: number = relativePosition * 90;

    return (
        <div className="section third-section">
            <p>third section!</p>
            <div style={{ backgroundColor: 'white', height: 100, width: 100, transform: `rotate(${ang}deg)` }}></div>
        </div>
    );
};

export const ScrollerPart: React.FC = () => {
    return (
        <Scroller className="scroller-container">
            <Section name="first-section" duration={5000}>
                <FirstSection />
            </Section>
            <Section name="second-section" duration={2000}>
                <SecondSection />
            </Section>
            <Section name="third-section" duration={1000}>
                <ThirdSection />
            </Section>
        </Scroller>
    );
};
