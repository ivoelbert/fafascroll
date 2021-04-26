import React from "react";
import { PhoneScene } from "./PhoneScene";
import { UIState } from "./UIState";
import { useScrollPosition } from "../../Lib/hooks/useScollPosition";
import { animationTiming, mapValue, timeSlice, easing } from "../../Lib/utils/utils";
import "./Phone.scss";

const phoneScene = new PhoneScene();
const phoneElem: HTMLCanvasElement = phoneScene.getDomElement();

export const Phone: React.FC = () => {
    const { relativePosition, absolutePosition } = useScrollPosition();
    const firstAnimationTiming = timeSlice(absolutePosition, 0, 1500);
    const secondAnimationTiming = timeSlice(absolutePosition, 2000, 3000);

    // Set the canvas' state each rerender.
    UIState.getInstance().setState({
        time: relativePosition,
        pullOutTime: firstAnimationTiming,
        moveAndRotateTime: secondAnimationTiming,
    });

    const refFunction = (node: HTMLDivElement | null): void => {
        node && node.appendChild(phoneElem);
    };

    const blurTiming = animationTiming(firstAnimationTiming, 0, 0.9);
    const maxBlur = 20;
    const canvasStyle: React.CSSProperties = {
        filter: `blur(${mapValue(blurTiming, 0, 1, maxBlur, 0)}px)`,
        WebkitFilter: `blur(${mapValue(blurTiming, 0, 1, maxBlur, 0)}px)`,
    };
    const infoStyle: React.CSSProperties = {
        opacity: secondAnimationTiming,
    };

    const textIntroTiming: number = easing.easeOutCubic(secondAnimationTiming);
    const textContainerStyle: React.CSSProperties = {
        transform: `translateX(${mapValue(textIntroTiming, 0, 1, 0, 6)}em)`,
    };

    return (
        <div className="phone-animation-container">
            <div style={canvasStyle} className="phone-container" ref={refFunction} />
            <div style={infoStyle} className="info-phone-container">
                <div style={textContainerStyle} className="text-container">
                    <h3>I got bored.</h3>
                    <p>Time to do something else.</p>
                </div>
            </div>
        </div>
    );
};
