import { ImageSourcePropType, TextInput } from "react-native";
import { TextInputProps } from "react-native-paper";



export interface SignupProps {
    signupMethod: boolean;

}

export interface ImageBgProps {

    image: string | ImageSourcePropType;
    children: React.ReactNode;

    width: number;
    height: number;
}


export interface CustomButtonProps {
    btnWidth: number;
    btnHeight: number;
    btnColor: string;
    label: string;
    icon: string | undefined;
    labelColor: string
}


export type  CustomTextInput = {
    label: string;
    rightIcon?: string;
    backgroundColor: string;
    textColor: string;

}