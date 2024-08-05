import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import {ImageBgProps} from '../../types/types';

const ImageBg: React.FC<ImageBgProps> = ({image, children}) => {
  // console.log(image)
  return (
    <ImageBackground
       source={require('../../assets/images/background/loginBg.jpg')}
    //   source={image}
      width={200}
      height={200}>
      {children}
    </ImageBackground>
  );
};

export default ImageBg;
