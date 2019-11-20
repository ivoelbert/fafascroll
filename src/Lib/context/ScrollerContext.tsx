import React, { useState, useCallback, useEffect, useRef } from 'react';

type Section = { name: string; height: number };

const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
};

const mapValue = (num: number, in_min: number, in_max: number, out_min: number, out_max: number): number => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

export interface ScrollerContext {
    getHeight: () => number;
    addSection: (name: string, sectionHeight: number) => void;
    isSectionVisible: (name: string) => [boolean, number];
    scrollerRef: React.RefObject<HTMLDivElement> | null;
}

// Default context, SHOULDN'T HAPPEN
const voidContext: ScrollerContext = {
    getHeight: () => {
        throw new Error("Can't use context outside ScrollerProvider");
    },
    addSection: (_name: string, _height: number) => {
        throw new Error("Can't use context outside ScrollerProvider");
    },
    isSectionVisible: (_name: string) => {
        throw new Error("Can't use context outside ScrollerProvider");
    },
    scrollerRef: null,
};

export const ScrollerContextValue = React.createContext<ScrollerContext>(voidContext);

const getPosition = (el: HTMLElement) => {
    var yPos = 0;

    while (el) {
        yPos += el.offsetTop + el.clientTop;
        el = el.offsetParent as any;
    }

    return yPos;
};

const useWindowScroll = (): number => {
    const [position, setPosition] = useState(0);

    const handler = useCallback((event: Event) => {
        const { scrollY } = window;
        setPosition(scrollY);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handler);

        return () => {
            window.removeEventListener('scroll', handler);
        };
    }, [handler]);

    return position;
};

const useWindowHeight = (): number => {
    const [height, setHeight] = useState(window.innerHeight);

    const handler = useCallback((event: Event) => {
        setHeight(window.innerHeight);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handler);

        return () => {
            window.removeEventListener('resize', handler);
        };
    }, [handler]);

    return height;
};

export const ScrollerProvider: React.FC = ({ children }) => {
    const [sections, setSections] = useState<Section[]>([]);

    const scrollPos: number = useWindowScroll();
    const winHeight: number = useWindowHeight();

    const scrollerRef = useRef<HTMLDivElement>(null);

    const addSection = (sectionName: string, sectionHeight: number): void => {
        // Bail out if that section is already in the state
        if (sections.find(({ name }) => name === sectionName)) {
            return;
        }

        setSections((sections: Section[]) => {
            const oldHeight = sections.length > 0 ? sections[sections.length - 1].height : 0;
            const newHeight = oldHeight + sectionHeight;
            return [...sections, { name: sectionName, height: newHeight }];
        });
    };

    const isSectionVisible = (name: string): [boolean, number] => {
        if (sections.length === 0) {
            return [false, 0];
        }

        const heightOffset = scrollerRef.current ? getPosition(scrollerRef.current) : 0;
        const normalizedScroll = scrollPos - heightOffset;

        const queriedSectionIndex: number = sections.findIndex(({ name: secName }) => secName === name);
        const queriedSection: Section = sections[queriedSectionIndex];
        const prevSectionHeight: number = queriedSectionIndex === 0 ? 0 : sections[queriedSectionIndex - 1].height;

        let isVisible: boolean;
        switch (queriedSectionIndex) {
            case 0:
                isVisible = normalizedScroll < queriedSection.height;
                break;

            case sections.length - 1:
                isVisible = normalizedScroll > prevSectionHeight;
                break;

            default:
                isVisible = normalizedScroll > prevSectionHeight && normalizedScroll < queriedSection.height;
        }

        const offset = clamp(mapValue(normalizedScroll, prevSectionHeight, queriedSection.height, 0, 1), 0, 1);

        return [isVisible, offset];
    };

    const getHeight = useCallback((): number => {
        const sectionsHeight: number = sections.length > 0 ? sections[sections.length - 1].height : 0;
        return winHeight + sectionsHeight;
    }, [sections, winHeight]);

    const themeHandler: ScrollerContext = {
        getHeight,
        addSection,
        isSectionVisible,
        scrollerRef,
    };

    return <ScrollerContextValue.Provider value={themeHandler}>{children}</ScrollerContextValue.Provider>;
};
