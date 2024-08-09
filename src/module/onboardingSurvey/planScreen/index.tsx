import {View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import firestore from '@react-native-firebase/firestore';
import textStyle from '../../../style/text/style';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import {Image} from 'react-native';
import CustomButton from '../../../components/button/customButton';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colorPalette} from '../../../assets/colorpalette/colorPalette';
import {onBoardingData} from '../../../services/dataSet';
import {fetchSurvey} from '../../../services/apis';
const PlanScreen = () => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  const [plans, setPlans] = useState();
  useEffect(() => {
    firestore()
      .collection('plans')
      .get()
      .then(i => {
        let arr: any = [];
        i.forEach(item => {
          arr.push(item.data());
        });
        console.log(arr[1].plans);
        setPlans(arr[1].plans);
      });
  }, []);
  //   console.log(plans);
  const up = async () => {
    try {
      onBoardingData.forEach(async item => {
        await firestore()
          .collection('survey')
          .doc(`${item.section}`)
          .set({screens:[...item.screens],id:`${item.section}`,section:`${item.section}`});

      });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={screenStyles.container}>
      <View>
        <FlatList
          ListHeaderComponent={<Text style={textStyle.headingText}>title</Text>}
          showsVerticalScrollIndicator={false}
          data={plans}
          renderItem={({item}) => (
            <Card style={screenStyles.cardContainer}>
              <Card.Title
                title={'sdaf'}
                titleStyle={{textAlign: 'center'}}
                titleNumberOfLines={2}
                style={screenStyles.cardTitle}
              />
              <Card.Content style={screenStyles.cardBody}>
                <View style={screenStyles.imageContainer}>
                  <Image
                    source={{uri: item.image}}
                    width={50}
                    height={50}
                    style={{borderRadius: 100}}
                  />
                </View>
                <Text variant="titleLarge" style={screenStyles.title}>
                  Card title
                </Text>
                <View style={screenStyles.descriptionContainer}>
                  <FlatList
                    data={item.description}
                    renderItem={({item, index}) => (
                      <View style={screenStyles.pointsContainer}>
                        <View style={screenStyles.tickIcon}>
                          <MaterialIcons name="done" color={'white'} />
                        </View>
                        <Text style={{textAlign: 'center'}} numberOfLines={4}>
                          {item.slice(0, 40)}
                        </Text>
                      </View>
                    )}
                  />
                </View>
              </Card.Content>
              <Card.Actions>
                <View style={screenStyles.actionContainer}>
                  <CustomButton
                    label="Add it to my plan"
                    btnWidth={width * 0.4}
                    btnHeight={width * 0.1}
                    btnColor={colorPalette.berry}
                    borderRadius={20}
                    labelColor="white"
                  />
                </View>
              </Card.Actions>
            </Card>
          )}
          ListFooterComponent={
            <TouchableOpacity
              style={screenStyles.skipButton}
              onPress={() => up()}>
              <Text
                style={[
                  textStyle.labelText,
                  {
                    textDecorationStyle: 'double',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                  },
                ]}>
                No, I dont't need 'title'
              </Text>
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  );
};

export default PlanScreen;
