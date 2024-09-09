import { ImageSourcePropType, TextInput } from "react-native";
import { QuickReplies, User } from "react-native-gifted-chat";
import { ButtonProps, TextInputProps } from "react-native-paper";



export interface SignupProps {
    signupMethod: boolean;
}
export interface ImageBgProps {

    image:  ImageSourcePropType ;
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
    textColor: string;
}


export type ScreenContextType = {
    width: number;
    height: number;
    isPortrait: boolean;
    scale: number;
    fontScale: number;
    isTabletType:boolean
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


export type DailyProgressCategory = "food" | "exercise" | "weight" | "bp" | "bc"

export interface IMessage {
    _id: string | number
    text: string
    createdAt: Date | number
    user: User
    image?: string
    video?: string
    audio?: string
    system?: boolean
    sent?: boolean
    received?: boolean
    pending?: boolean
    quickReplies?: QuickReplies
  }[]