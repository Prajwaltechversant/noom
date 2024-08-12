import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({


    container: {
        paddingTop: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.white,
        flex: 1,
        height:'100%'
    },
    content: {
        paddingHorizontal: screenContext.isPortrait ? height * 0.03 : height * 0.002,

    },
    headerContainer: {
        backgroundColor: colorPalette.moss,
        alignItems: 'center',
        height: screenContext.isPortrait ? height * 0.2 : height * 0.1,
        width: '100%',
        justifyContent: 'center',
    },
    personilzedBox: {
        backgroundColor: colorPalette.mint,
        borderRadius: 10,
        paddingHorizontal: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        height: screenContext.isPortrait ? height * 0.2 : height * 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    collapseViewBtn: {
        marginVertical: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        elevation: 5,
        backgroundColor: colorPalette.sand,
        borderRadius: 10,

    },
    priceInfo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: screenContext.isPortrait ? height * 0.03 : height * 0.002,
    },
    paymentBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        gap: 30,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10
    },
    logo: {
        resizeMode: 'contain',
        width: 60,
        height: 60
    },
    cardOption: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorPalette.sand,
        borderRadius: 10
    }

})

export default styles