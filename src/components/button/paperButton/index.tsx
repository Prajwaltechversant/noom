import { View, Text } from 'react-native';
import React from 'react';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import { Button, ButtonProps } from 'react-native-paper';
import { CustomButtonProps } from '../../../types/types';

type Props = CustomButtonProps & ButtonProps;
const PaperButton: React.FC<Props> = ({
  btnColor,
  btnHeight,
  btnWidth,
  icon,
  label,
  labelColor,
  borderRadius,
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
    <Button
      {...props}
      buttonColor={btnColor}
      textColor={labelColor}
      style={{
        height: btnHeight,
        width: btnWidth,
        borderRadius: borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {label}
    </Button>
  );
};

export default PaperButton;
