import { PixelRatio, StyleSheet } from "react-native";
import { ScreenContextType } from "../../types/types";
import { colorPalette } from "../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        // padding: wid,
        // borderWidth: 1,
        backgroundColor: 'white',
        height: height * 0.15,
        width: 'auto',
        alignItems: 'center',
        // justifyContent: 'center',

    },

    pointerContainer: {
        position: 'absolute',
        left: width * 0.5,
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
        width: width / 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.1,
        borderRightWidth: 2,
        borderColor: colorPalette.white

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