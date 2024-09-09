import { View, Text } from 'react-native';
import React from 'react';
import { useScreenContext } from '../../context/screenContext';
import styles from './style';
import { TextInput, TextInputProps } from 'react-native-paper';
import { CustomButtonProps, CustomTextInput } from '../../types/types';

type Props = CustomTextInput & TextInputProps;

const CustomTextInputComponent: React.FC<Props> = ({
  backgroundColor,
  label,
  textColor,
  rightIcon,
  ...props
}) => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;

  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  return (
    <TextInput
      label={label}
      placeholderTextColor={textColor}
      style={screenStyles.container}
      textColor={'black'}
      {...props}
    />
  );
};

export default CustomTextInputComponent;
