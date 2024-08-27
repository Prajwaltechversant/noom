import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton } from '@rneui/themed';


interface Props {
    width: number;
    height: number;
}

const ImageSkeltonComponent: React.FC<Props> = ({ height, width }) => {
    return (
        <Skeleton width={width} height={height} />
    )
}

export default ImageSkeltonComponent