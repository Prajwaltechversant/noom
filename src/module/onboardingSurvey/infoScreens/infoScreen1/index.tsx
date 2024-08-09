import {View, Text, Image} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../../../context/screenContext';
import styles from './style';
import textStyle from '../../../../style/text/style';
import CustomButton from '../../../../components/button/customButton';
import {colorPalette} from '../../../../assets/colorpalette/colorPalette';

type Page = 'intro1' | 'intro2';

interface Props {
  page: Page;
  image: string;
}

const InfoScreen: React.FC<Props> = ({image, page}) => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  return (
    <View style={screenStyles.container}>
      {page === 'intro1' ? (
        <Text style={textStyle.headingText}>
          You are in good hands username
        </Text>
      ) : (
        <Text style={textStyle.headingText}>
          Furthermore , we are trusted by popular brands
        </Text>
      )}
      <View style={screenStyles.contentWrapper}>
        <Image
          source={{
            uri: image,
          }}
          style={screenStyles.contentImage}
        />
        {page === 'intro1' ? (
          <Text style={textStyle.labelText} numberOfLines={2}>
            You are not alone , wh've helped 1234 peoples lose weight!
          </Text>
        ) : (
          <Text style={textStyle.labelText} numberOfLines={3}>
            In fact, several leading health insurance plans have planned with us
            due to our proven result
          </Text>
        )}

        <CustomButton
          btnHeight={width * 0.2}
          btnWidth={width * 0.8}
          label="Continue"
          btnColor={colorPalette.Lagoon}
        />
      </View>
    </View>
  );
};

export default InfoScreen;
