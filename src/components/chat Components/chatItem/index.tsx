import { View, Text } from 'react-native'
import React from 'react'
import styles from './style';
import { useScreenContext } from '../../../context/screenContext';
import textStyle from '../../../style/text/style';


interface Props {
    item: any
}
const ChatItem: React.FC<Props> = ({ item }) => {
    const screenContext = useScreenContext();

    const { width, fontScale, height, isPortrait, isTabletType, scale } =
        screenContext;
    const screenStyles = styles(
        screenContext,
        isPortrait ? width : height,
        isPortrait ? height : width,
    );
    return (

        <View style={[screenStyles.container, {
            backgroundColor: item.role === 'admin' ? '#128C7E' : '#075E54',
            alignSelf: item.role === 'admin' ? 'flex-start' : 'flex-end',

        }]}>
            <Text style={[textStyle.labelText, { textAlign: item.role === 'admin' ? 'left' : 'right', color: 'white' }]}>{item.msg}</Text>
        </View>
    )
}

export default ChatItem