import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useScreenContext } from '../../../context/screenContext';
import textStyle from '../../../style/text/style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { CourseType } from '../../../types/types';
import PlayerModal from '../playerModal'; 
import { setupPlayer } from '../../../../musicPlayerService';
import TrackPlayer from 'react-native-track-player';
import styles from '../course box/style';

interface Props {
  item: CourseType;
}

const DailyProgressCard: React.FC = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait } = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width
  );
  const navigation: any = useNavigation();


  return (
    <>
      <View style={screenStyles.container}>
        <View style={screenStyles.col1}>
          <Text
            style={[
              textStyle.questionText,
              { textAlign: 'left', textTransform: 'capitalize' },
            ]}
          >
            {/* {item?.title} */}
          </Text>
          <View style={screenStyles.actionContainer}>
          </View>
        </View>
        <View style={screenStyles.col2}>
            <Image
              source={{
                uri: 'https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/success-green-check-mark-icon.png',
              }}
              style={screenStyles.thumbnail}
            />
          
        </View>

      </View>
      
    </>
  );
};

export default DailyProgressCard;
