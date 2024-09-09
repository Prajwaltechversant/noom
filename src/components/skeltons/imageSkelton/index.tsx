import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton } from '@rneui/themed';
import { ActivityIndicator } from 'react-native-paper';
import styles from './style';


interface Props {
    width?: number;
    height?: number;
    borderRadius?: number
}

const ImageSkeltonComponent: React.FC<Props> = ({ height, width, borderRadius = 0 }) => {
    return (
        <View style={{ justifyContent: 'center', }}>
            <Skeleton width={width ? width : 'auto'} height={height ? height : 'auto'} style={{ borderRadius }} />
            <View style={styles.activityLoader}><ActivityIndicator /></View>
        </View>
    )
}

export default ImageSkeltonComponent