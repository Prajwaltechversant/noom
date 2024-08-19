import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useScreenContext} from '../../../../context/screenContext';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import textStyle from '../../../../style/text/style';
import CustomTextInputComponent from '../../../../components/textInput';
import CustomComponentModal from '../../../../components/modal/customComponentModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../../components/button/customButton';
import { colorPalette } from '../../../../assets/colorpalette/colorPalette';
interface Props {
  item: any;
}

const LogFoodScreen: React.FC<Props> = ({item}) => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait} = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const data = item.data;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [quantity, setQuantity] = useState(0);

  const handleSelectedItem = (item: any) => {
    setModalVisible(!modalVisible);
    setSelectedItem(item);
  };

  const incrementCount = () => {
    setQuantity(quantity + 1);
  };

  const decrementCounter = () => {
   let newQuantiy = quantity-1;
   if(newQuantiy>=0){
    setQuantity(newQuantiy);
   }
  };
  return (
    <View style={screenStyles.container}>
      <Text style={textStyle.headingText}>Log Your Meals</Text>
      <View style={screenStyles.searchBoxContainer}>
        <TextInput
          style={screenStyles.textInput}
          placeholder="Search Your Meals"
          role="searchbox"
        />
      </View>

      <View style={screenStyles.listContainer}>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={screenStyles.item}
              onPress={() => handleSelectedItem(item)}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

        <CustomComponentModal
          modalHeight={height * 0.4}
          visible={modalVisible}
          setProgressModalVisible={setModalVisible}>
          <View>
            <Text style={[textStyle.headingText, {textAlign: 'center'}]}>
              {selectedItem?.title}
            </Text>
            <View>
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
                  <Text>{quantity}</Text>
                </View>
                <AntDesign
                  name="pluscircleo"
                  size={30}
                  style={screenStyles.addQuantiyBox}
                  onPress={incrementCount}
                />
              </View>
            </View>
          <CustomButton
label='Save'
btnColor={colorPalette.berry}
btnHeight={60}
btnWidth={90}


/>
          </View>
        </CustomComponentModal>
      </View>
    </View>
  );
};

export default LogFoodScreen;
