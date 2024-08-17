import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useScreenContext } from '../../context/screenContext';
import styles from './style';
import { Polygon, Svg } from 'react-native-svg';

const Loader: React.FC = () => {
    const screenContext = useScreenContext();
    const { width, height, isPortrait } = screenContext;
    const screenStyles = styles(
        screenContext,
        isPortrait ? width : height,
        isPortrait ? height : width,
    );
    const size = 100
    const halfSize = size / 2;

    return (
        <View style={[StyleSheet.absoluteFillObject, { justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }]}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
                <Polygon
                    points={`${halfSize},0 ${size},50 ${halfSize},${size} 0,50`}
                    fill={'red'}
                />
            </Svg>
        </View>
    )
}

export default Loader