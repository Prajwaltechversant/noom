import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../../context/screenContext';
import textStyle from '../../../style/text/style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {CourseType} from '../../../types/types';

interface Props {
  item: CourseType;
}

const CourseItem: React.FC<Props> = ({item}) => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  // console.log(item)
  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.col1}>
        <Text style={[textStyle.questionText, {textAlign: 'left'}]}>
          {item?.title}
        </Text>
        <View style={screenStyles.actionContainer}>
          <TouchableOpacity style={screenStyles.actionBox} onPress={()=>navigation.navigate('courseCarouselPage',{
            ...item
          })}>
            <FontAwesome name="book" size={20} color={'black'} />
            <Text style={screenStyles.text}>Read</Text>
          </TouchableOpacity>
          <View style={screenStyles.actionBox}>
            <Feather name="speaker" size={20} color={'black'} />
            <Text style={screenStyles.text}>Listen</Text>
          </View>
        </View>
      </View>
      <View style={screenStyles.col2}>
        <Image source={{uri: item?.thumbnail}} style={screenStyles.thumbnail} />
      </View>
    </View>
  );
};

export default CourseItem;
