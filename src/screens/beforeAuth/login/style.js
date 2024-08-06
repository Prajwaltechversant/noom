import { StyleSheet } from "react-native";

const styles =(screenContext, width, height) => StyleSheet.create({
    container:{
        height,
        width,
        justifyContent:'center',
        alignItems:'center',


    },
    btnContainer:{
        marginTop:screenContext.isPortrait  ? width * 0.2 : width * 0.2
    },
    privacyPolicy:{
        position:'absolute',
        bottom:screenContext.isPortrait  ? width * 0.08 : width * 0.08
    }
})

export default styles