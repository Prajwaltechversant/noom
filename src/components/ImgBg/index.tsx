import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { ImageBgProps } from '../../types/types';

const ImageBg: React.FC<ImageBgProps> = ({ image, children, height, width }) => {
  return (
    <ImageBackground source={image} width={width} height={height} style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      { children }
    </ImageBackground >
  );
};

export default ImageBg;
