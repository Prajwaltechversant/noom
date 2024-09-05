import { View, Text } from 'react-native'
import React from 'react'
import { useScreenContext } from '../../context/screenContext';
import styles from './style';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native-paper';

type Props = ActivityIndicatorProps
const ActivityLoader: React.FC<Props> = ({ ...props }) => {
    const screenContext = useScreenContext();
    const { width, height, isPortrait } = screenContext;
    const screenStyles = styles(
        screenContext,
        isPortrait ? width : height,
        isPortrait ? height : width,
    );
    return (
        <ActivityIndicator  {...props} size={30} />
    )
}

export default ActivityLoader