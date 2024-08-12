import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';

const PaymementScreen2: React.FC = () => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  return (
    <ScrollView style={screenStyles.container}>
      <View style={screenStyles.headerContainer}>
        <Text>
          User's {`\n`}
          10-Months Personalized Plan
        </Text>
      </View>
      <View>
        <Text>View Personalized Plan</Text>
        <View style={screenStyles.personilzedBox}>
          <Text numberOfLines={4}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error
            commodi consequuntur enim aspernatur provident blanditiis aut?
            Dolorum porro, fugit, neque minus placeat consectetur dolorem totam,
            unde dolore distinctio ipsa quo!
          </Text>
        </View>

        <View>
            <Text>chart..</Text>
        </View>
      </View>

      <View>
        
      </View>
    </ScrollView>
  );
};

export default PaymementScreen2;
