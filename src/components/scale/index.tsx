import { View, Text, FlatList, ScrollView, NativeScrollEvent } from 'react-native';
import React, { useRef, useState } from 'react';
import { useScreenContext } from '../../context/screenContext';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import textStyle from '../../style/text/style';
import { NativeSyntheticEvent } from 'react-native';
import { colorPalette } from '../../assets/colorpalette/colorPalette';

const Scale: React.FC = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait } = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  const wrapperRef = useRef(null)
  const navigation: any = useNavigation();

  const [pointerPosition, setPointerPosition] = useState(0)
  console.log(wrapperRef.current)

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log(e.nativeEvent.contentOffset.x/10)
    // console.log(e.currentTarget)

  }

  console.log(pointerPosition, 'epepe')
  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.scaleWrapper}
      // ref={wrapperRef}

      >
        {/* <View style={screenStyles.pointer}
          onLayout={(e) => {
            setPointerPosition(e.nativeEvent.layout.x)
          }}

        ></View> */}
        {/* <ScrollView style={screenStyles.scrollView}
          horizontal

          onScroll={handleScroll}

        >

          {
            Array(10).map(({ item, index }) => (
              <View style={screenStyles.innerWrapper}>
                <Text style={textStyle.labelText}>{index}</Text>
              </View>
            ))
          }


        </ScrollView> */}

        <FlatList
          data={Array(100)}
          horizontal
          onScroll={handleScroll}
          contentContainerStyle={{ backgroundColor: colorPalette.btnPrimary }}
          renderItem={({ item, index }) => (
            <View style={screenStyles.innerWrapper}
              key={index}
            >
              <View style={screenStyles.scaleItem}>
                <Text style={[textStyle.labelText, { position: 'absolute', bottom: -20,left:-5 }]}>{index}</Text>
              </View>
            </View>
          )}


        />

      </View>
    </View>
  );
};

export default Scale;
