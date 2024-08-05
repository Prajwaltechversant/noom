import { StyleSheet } from "react-native";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext, width, height,) => StyleSheet.create({
    container: {
        backgroundColor: colorPalette.white,
        flex: 1,
        padding: screenContext.isPortrait ? height * 0.001 : height * 0.002,


    },
    bannerContainer:{justifyContent:'center', alignItems:'center'},
    headingText: {
        textAlign: 'center',
        fontWeight: '900',
        color: colorPalette.black,
        fontSize: 25
    },
    bannerImg: {
        width: screenContext.isPortrait ? width :width,
        height: screenContext.isPortrait ? width * 1.2 : width * 0.6,
        resizeMode: 'cover'
    },
    subHeading: {
        color: colorPalette.black,
        textAlign: 'center'
        // justifyContent:'center'

    },
    actionContainer: {
        padding: screenContext.isPortrait ? width * 0.06 : width * 0.06,
        justifyContent:'center',
        alignItems:'center'

    },
    authBtn: {
        backgroundColor: colorPalette.tarocco,
        width: screenContext.isPortrait ? width * 0.8 : width * 0.8,
        height: screenContext.isPortrait ? width * 0.12 :width * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10,
        borderRadius:15
    },
    loginBtn :{
        // backgroundColor: colorPalette.tarocco,
        width: screenContext.isPortrait ? width * 0.8 : width * 0.8,
        height: screenContext.isPortrait ? width * 0.12 :width * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10,
        borderRadius:15
    },
    authBtnText:{
        color:colorPalette.white
    }
});

export default styles