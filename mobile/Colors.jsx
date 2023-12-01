import {
    useColorScheme
} from 'react-native';


export const useProjectColors = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const COLORS = {
        backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
        primaryColor: isDarkMode ? '#44cc77' : '#309054',
        inactiveColor: isDarkMode ? '#ebf1f1' : '#bec3c7',
    };
    return COLORS;
}
