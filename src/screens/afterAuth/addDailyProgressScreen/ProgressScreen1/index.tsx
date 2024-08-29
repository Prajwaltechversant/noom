import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useScreenContext } from '../../../../context/screenContext';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import textStyle from '../../../../style/text/style';
import CustomTextInputComponent from '../../../../components/textInput';
import CustomComponentModal from '../../../../components/modal/customComponentModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../../components/button/customButton';
import { colorPalette } from '../../../../assets/colorpalette/colorPalette';
import { Image } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore, { doc, Filter } from '@react-native-firebase/firestore';
import { TextInput } from 'react-native-paper';
import { addToDailyProgress1 } from '../../../../services/dailyprogress';
interface Props {
  item: any;
  category: string;
}
const LogFoodScreen: React.FC<Props> = ({ item, category }) => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait } = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  // const data = item.data;
  const [data, setData] = useState(item.data);
  const currentUser = auth().currentUser?.uid;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSeachResult] = useState<any>([]);
  const [isSearching, setIssearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectedItem = (item: any) => {
    setModalVisible(!modalVisible);
    setSelectedItem(item);
  };
  const incrementCount = () => {
    setQuantity(quantity + 1);
  };
  const decrementCounter = () => {
    let newQuantiy = quantity - 1;
    if (newQuantiy >= 0) {
      setQuantity(newQuantiy);
    }
  };


  const searchItem = (e: string) => {
    setLoading(true);
    setIssearching(true);
    setSearchQuery(e);
    try {
      if (e.length > 0) {
        firestore()
          .collection(`dailyProgress`)
          .where('id', '==', item.id)
          .get()
          .then(snapshot => {
            let searchItems = snapshot.docs[0]
              .data()
              .data.filter((ele: any) => ele.title.includes(e.toLowerCase()));
            if (searchItems.length > 0) {
              setSeachResult(searchItems);
              setLoading(false);
            } else {
              setSeachResult([]);
              setLoading(false);
            }
          });
      } else {
        setSeachResult([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    searchQuery.length < 1 && setSeachResult([]);
  }, [searchQuery]);



  const handleSave = () => {

    let count = 0

    firestore().collection(`UserData/${currentUser}/dailyProgress`)
      .doc(`${item.id}-${selectedItem.id}`)
      .get()
      .then(item => {
        const res: any = item.data()
        count = count + res.data.count
      })
      .finally(
        ()=>{
          if (count > 0) {
            let newQuantity = quantity + count
            addToDailyProgress1(item, selectedItem, newQuantity)

          } else {
            addToDailyProgress1(item, selectedItem, quantity)
          }
          setQuantity(0);
          setModalVisible(!modalVisible);
          navigation.goBack()
        }
      )
  }

  // const startOfDay = new Date(
  //   new Date().setHours(0, 0, 0, 0),
  // );
  // const endOfDay = new Date(
  //   new Date().setHours(23, 59, 59, 999),
  // );

  return (
    <View style={screenStyles.container}>
      <Text style={textStyle.headingText}>Log Your {category}</Text>
      <View style={screenStyles.searchBoxContainer}>
        <TextInput
          mode="outlined"
          style={screenStyles.textInput}
          placeholder={`Search Your ${category}`}
          role="searchbox"
          onChangeText={e => searchItem(e)}
          outlineColor="transparent"
        />
      </View>

      <View style={screenStyles.listContainer}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={searchResult.length > 0 ? searchResult : data}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={screenStyles.item}
                onPress={() => handleSelectedItem(item)}>
                <Image
                  source={{ uri: item?.image }}
                  style={screenStyles.itemImage}
                />
                <Text style={textStyle.labelText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        <CustomComponentModal
          modalHeight={height * 0.4}
          visible={modalVisible}
          setProgressModalVisible={setModalVisible}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={{ uri: selectedItem?.image }}
              width={120}
              height={120}
              style={{ marginBottom: 60, borderRadius: 100 }}
            />

            <View>
              <Text style={textStyle.questionText}>
                {category === 'food' ? 'Add Quantity' : 'Add time'}
              </Text>
              <View style={screenStyles.addContainer}>
                <TouchableOpacity onPress={() => setQuantity}>
                  <AntDesign
                    name="minuscircleo"
                    size={30}
                    style={screenStyles.addQuantiyBox}
                    onPress={decrementCounter}
                  />
                </TouchableOpacity>
                <View style={screenStyles.addQuantiyBox}>
                  <Text>
                    {quantity} {category === 'food' ? '' : 'Min'}
                  </Text>
                </View>
                <AntDesign
                  name="pluscircleo"
                  size={30}
                  style={screenStyles.addQuantiyBox}
                  onPress={incrementCount}
                />
              </View>
            </View>
            <View style={{ alignSelf: 'center', marginVertical: 10 }}>
              <CustomButton
                label="Save"
                btnColor={colorPalette.berry}
                btnHeight={40}
                btnWidth={60}
                borderRadius={20}
                onPress={handleSave}
                labelColor="white"
              />
            </View>
          </View>
        </CustomComponentModal>
      </View>
    </View>
  );
};

export default LogFoodScreen;
