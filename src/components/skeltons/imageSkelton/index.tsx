import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton } from '@rneui/themed';
import { ActivityIndicator } from 'react-native-paper';
import styles from './style';


interface Props {
    width?: number;
    height?: number;
}

const ImageSkeltonComponent: React.FC<Props> = ({ height, width }) => {
    return (
        <View style={{borderWidth:1,justifyContent:'center'}}>
            <Skeleton width={width ? width : 'auto'} height={height ? height : 'auto'} />
            <View style={styles.activityLoader}><ActivityIndicator /></View>

        </View>
    )
}

export default ImageSkeltonComponent