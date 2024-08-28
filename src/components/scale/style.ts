import { PixelRatio, StyleSheet } from "react-native";
import { ScreenContextType } from "../../types/types";
import { colorPalette } from "../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        // padding: wid,
        // borderWidth: 1,
        backgroundColor: 'white',
        height: screenContext.isPortrait ? height * 0.15 : height * 0.15,
        width: 'auto',
        alignItems: 'center',
        // justifyContent: 'center',

    },

    pointerContainer: {
        position: 'absolute',
        left: screenContext.isPortrait ? width * 0.49 : height * 0.32,
        zIndex: 1,

    },
    pointer: {
        width: 10,
        height: 30,
        backgroundColor: colorPalette.white,
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderCurve: 'circular',
        borderStyle: 'solid',
        borderWidth: 1


    },
    scaleContainer: {
        // paddingVertical: 10,
        paddingHorizontal: width / 2 - width / 10,
        backgroundColor: colorPalette.btnPrimary,


    },
    markerContainer: {
        width: screenContext.isPortrait ? width / 5 : height / 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: screenContext.isPortrait ? width * 0.17 : height * 0.1,
        borderRightWidth: 2,
        borderColor: colorPalette.white,
        // borderWidth: 1
    },
    markerText: {
        color: colorPalette.white,
        fontSize: 16,
        borderWidth: 1
    },
    selectedValueText: {
        marginTop: 20,
        fontSize: 18,
        borderWidth: 1
    },
})

export default styles