import { useContext } from 'react';
import { SectionContextValue, SectionContext } from '../context/SectionContext';

export const useScrollPosition = (): SectionContext => {
    return useContext<SectionContext>(SectionContextValue);
};
