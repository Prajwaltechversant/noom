import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import {CustomButtonProps} from '../../../types/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacityProps } from 'react-native';


type Props = CustomButtonProps & TouchableOpacityProps
const CustomButton: React.FC<Props> = ({
  btnColor,
  label,
  btnHeight,
  icon,
  btnWidth,
  labelColor,
  borderRadius,
  ...props

}) => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;

  const screenStyles = styles(
    screenContext,
    btnWidth,
    btnHeight,
    btnColor,
    labelColor,
    icon,
  );

  return (
    <TouchableOpacity style={[screenStyles.btn,{borderRadius:borderRadius}]} {...props}>
      {icon && <AntDesign name={icon} color={labelColor} size={20} style={screenStyles.icon} />}
      <Text style={{color:labelColor}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
