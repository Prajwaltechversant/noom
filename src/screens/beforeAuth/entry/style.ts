import { StyleSheet } from "react-native";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";
import { ScreenContextType } from "../../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number,) => StyleSheet.create({
    container: {
        backgroundColor: colorPalette.white,
        flex: 1,
        padding: screenContext.isPortrait ? height * 0.001 : height * 0.002,


    },
    bannerContainer: { justifyContent: 'center', alignItems: 'center' },
    headingText: {
        textAlign: 'center',
        fontWeight: '900',
        color: colorPalette.black,
        fontSize: 25
    },
    bannerImg: {
        width: screenContext.isPortrait ? width : height,
        height: screenContext.isPortrait ? height * 0.6 : width * 0.5,
        resizeMode: 'stretch',
        

    },
    subHeading: {
        color: colorPalette.black,
        textAlign: 'center'
    },
    actionContainer: {
        padding: screenContext.isPortrait ? width * 0.06 : width * 0.06,
        justifyContent: 'center',
        alignItems: 'center'

    },
    authBtn: {
        backgroundColor: colorPalette.tarocco,
        width: screenContext.isPortrait ? width * 0.8 : width * 0.8,
        height: screenContext.isPortrait ? width * 0.12 : width * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 15
    },
    loginBtn: {
        // backgroundColor: colorPalette.tarocco,
        width: screenContext.isPortrait ? width * 0.8 : width * 0.8,
        height: screenContext.isPortrait ? width * 0.12 : width * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 15
    },
    authBtnText: {
        color: colorPalette.white
    }
});

export default styles