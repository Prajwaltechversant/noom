import { View, Text } from 'react-native'
import React from 'react'
import styles from './style';
import { useScreenContext } from '../../../context/screenContext';
import textStyle from '../../../style/text/style';


interface Props {
    item: any,
    currentUid: string | undefined


}
const ChatItem: React.FC<Props> = ({ item, currentUid }) => {
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
            backgroundColor: item.fromId === currentUid ? '#128C7E' : '#075E54',
            alignSelf: item.fromId === currentUid ? 'flex-end' : 'flex-start',

        }]}>
            <Text style={[textStyle.labelText, { textAlign: item.role === 'admin' ? 'left' : 'right', color: 'white' }]}>{item.message}</Text>
        </View>
    )
}

export default ChatItem