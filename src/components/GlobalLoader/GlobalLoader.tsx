import { LinearProgress } from '@mui/material';
import { useIsFetching } from '../../hooks/useIsFetching';

export const GlobalLoader = () => {
    const isFetching = useIsFetching();

    if (!isFetching) return null;

    return (
        <LinearProgress
            style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2000 }}
        />
    );
};