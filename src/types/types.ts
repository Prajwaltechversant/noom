import { ImageSourcePropType } from "react-native";



export interface SignupProps {
    signupMethod: boolean;

}

export interface ImageBgProps{

    image:string | ImageSourcePropType;
    children:React.ReactNode;

    width:number;
    height:number;
}


export interface CustomButtonProps{
    btnWidth:number;
    btnHeight:number;
    btnColor:string;
    label:string;
    icon:string | undefined;
    labelColor:string
}