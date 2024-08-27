import { View, Text } from 'react-native'
import React from 'react'
import { useScreenContext } from '../../context/screenContext';
import styles from './style';
import LottieView from 'lottie-react-native';

const NoDataComponent: React.FC = () => {

    const screenContext = useScreenContext();
    const { width, fontScale, height, isPortrait, isTabletType, scale } =
        screenContext;
    const screenStyles = styles(
        screenContext,
        isPortrait ? width : height,
        isPortrait ? height : width,
    );
    return (
        <View style={screenStyles.animationView}
        >
            <LottieView source={require('../../assets/animation/Animation - 1724570297274.json')}
                autoPlay loop style={{ width: width * .4, height: height * .8 }} /></View>
    )
}

export default NoDataComponent 