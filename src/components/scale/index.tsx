import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../context/screenContext';
import {useNavigation} from '@react-navigation/native';
import styles from './style';

const Scale: React.FC = () => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait} = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.scaleWrapper}>
        <View style={screenStyles.pointer}></View>
        <FlatList
          data={Array(100)}
          horizontal
          renderItem={({item, index}) => (
            <View style={screenStyles.innerWrapper}></View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Scale;
