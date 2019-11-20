import { useContext } from 'react';
import { ScrollerContextValue, ScrollerContext } from '../context/ScrollerContext';

export const useScrollerContext = (): ScrollerContext => {
    return useContext<ScrollerContext>(ScrollerContextValue);
}