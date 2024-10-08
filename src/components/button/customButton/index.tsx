import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import { CustomButtonProps } from '../../../types/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacityProps } from 'react-native';
import { Circle, Svg } from 'react-native-svg';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';

type Props = CustomButtonProps & TouchableOpacityProps;
const CustomButton: React.FC<Props> = ({
  btnColor,
  label,
  btnHeight,
  icon,
  btnWidth,
  labelColor,
  borderRadius,
  leftIcon,
  ...props
}) => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;

  const screenStyles = styles(
    screenContext,
    btnWidth,
    btnHeight,
    btnColor,
    labelColor,
    icon,
    leftIcon,
  );


  return (
    <TouchableOpacity
      style={[screenStyles.btn, { borderRadius: borderRadius }]}
      {...props}>
      {leftIcon && (
        <Svg
          style={{
            width: btnHeight,
            height: btnHeight,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Circle
            cx={btnHeight / 2}
            cy={btnHeight / 2}
            r="15"
            stroke="black"
            strokeWidth="2"
            fill={colorPalette.sand1}
          />
        </Svg>
      )}
      {icon && (
        <AntDesign
          name={icon}
          color={labelColor}
          size={20}
          style={screenStyles.icon}
        />
      )}
      <Text style={{ color: labelColor }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
