import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useScreenContext } from '../../../../context/screenContext';
import styles from './style';
import textStyle from '../../../../style/text/style';
import CustomButton from '../../../../components/button/customButton';
import { colorPalette } from '../../../../assets/colorpalette/colorPalette';
import { useNavigation } from '@react-navigation/native';
import { screenNames } from '../../../../preferences/staticVariable';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImageSkeltonComponent from '../../../../components/skeltons/imageSkelton';


type Page = 'intro1' | 'intro2';

interface Props {
  page: Page;
  image: string;
}

const InfoScreen: React.FC = ({ route }: any) => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const currentUser = auth().currentUser?.email;
  const [isImageIsLoading, setIsImageIsLoading] = useState(true)



  return (
    <View style={screenStyles.container}>
      {route.params.page === 'intro1' ? (
        <Text style={textStyle.headingText}>
          You are in good hands {currentUser?.slice(0, -10)}
        </Text>
      ) : (
        <Text style={textStyle.headingText}>
          Furthermore , we are trusted by popular brands
        </Text>
      )}
      <View style={screenStyles.contentWrapper}>
        <View>
          <Image
            source={{
              uri: route.params.image,
            }}
            style={screenStyles.contentImage}
            onLoad={() => setIsImageIsLoading(false)}
          />
          {isImageIsLoading && <View style={{ position: 'absolute' }}>
            <ImageSkeltonComponent width={isPortrait ? width * .8 : width * .7} height={isPortrait ? height * 0.5 : height * 0.2} />
          </View>}
        </View>
        {route.params.page === 'intro1' ? (
          <Text style={textStyle.labelText} numberOfLines={2}>
            You are not alone , we've helped 1234 peoples lose weight!
          </Text>
        ) : (
          <Text style={textStyle.labelText} numberOfLines={3}>
            In fact, several leading health insurance plans have planned with us
            due to our proven result
          </Text>
        )}
        <CustomButton
          btnHeight={width * 0.1}
          btnWidth={width * 0.4}
          label="Continue"
          btnColor={colorPalette.Lagoon}
          labelColor={colorPalette.white}
          onPress={() => navigation.goBack(screenNames.ONBAORDING)}
        />
      </View>
    </View>
  );
};

export default React.memo(InfoScreen);
