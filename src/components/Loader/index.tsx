import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useScreenContext } from '../../context/screenContext';
import styles from './style';
import { Polygon, Svg } from 'react-native-svg';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

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
    const duration = 3000;
    const easing = Easing.bezier(0.25, -0.5, 0.25, 1);
    const scale = useSharedValue<number>(1)
    const rotation = useSharedValue<number>(0)
    React.useEffect(() => {
        scale.value = withRepeat(withTiming(2, { duration, easing }), -1);
        rotation.value = withRepeat(withTiming(2, { duration, easing }), -1);
    }, []);

 
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value * 360}deg` }, { scale: scale.value }],
    }));
    return (
        <View style={[StyleSheet.absoluteFillObject, { justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }]}>
            <AnimatedSvg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" style={
                [animatedStyle, {}]
            }>
                <Polygon
                    points={`${halfSize},0 ${size},50 ${halfSize},${size} 0,50`}
                    fill={'red'}
                />
            </AnimatedSvg>
        </View>
    )
}

export default Loader