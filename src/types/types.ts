import { ImageSourcePropType, TextInput } from "react-native";
import { ButtonProps, TextInputProps } from "react-native-paper";



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
    btnWidth: number
    btnHeight: number;
    btnColor: string;
    label: string;
    icon?: string | undefined;
    labelColor?: string;
    borderRadius?: number;
    leftIcon?: boolean;
}


export type CustomTextInput = {
    label?: string;
    rightIcon?: string;
    backgroundColor?: string;
    textColor?: string;

}


export type ScreenContextType = {
    width: number;
    height: number;
    isPortrait: boolean;
    scale: number;
    fontScale: number
}

export type CourseType = {
    title: string;
    id: number;
    description: string;
    thumbnail: string;
    images: string[];
    createdAt: Date;
    type: string;
    isCompleted: boolean;
    audio: string;

}