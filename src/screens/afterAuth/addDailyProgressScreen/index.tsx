import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {DailyProgressCategory} from '../../../types/types';
import ReciepiesScreen from '../drawer screens/reciepies';
import LogFoodScreen from './food';
import LogWeightScreen from './logWeightScreen';

const DailyProgressScreen: React.FC = ({route}: any) => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait} = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const category: DailyProgressCategory = route.params.item.category;
  const item = route.params.item;

  switch (category) {
    case 'food':
      return(
        <LogFoodScreen item={item} />
      );
    case 'exercise':
        return(
            <LogWeightScreen />
        )
    case 'weight':
        return(
            <LogWeightScreen  />
        )
  }

//   return (
//     <View>
//       <Text>index</Text>
//     </View>
//   );
};

export default DailyProgressScreen;
