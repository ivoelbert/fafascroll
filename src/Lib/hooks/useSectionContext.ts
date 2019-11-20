import { useContext } from 'react';
import { SectionContextValue, SectionContext } from '../context/SectionContext';

export const useSectionContext = (): SectionContext => {
    return useContext<SectionContext>(SectionContextValue);
};
