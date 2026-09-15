import { createTheme } from '@mui/material/styles';
import type { ThemeMode } from '../features/theme/themeSlice';

export const getMuiTheme = (mode: ThemeMode) =>
    createTheme({
        palette: {
            mode,
        },
    });