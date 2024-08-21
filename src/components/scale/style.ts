import { PixelRatio, StyleSheet } from "react-native";
import { ScreenContextType } from "../../types/types";
import { colorPalette } from "../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height
    },
    scaleWrapper: {
        borderWidth: 1,
        width: width * 0.8,
        height: height * 0.1,
        alignItems: 'center'
    },
    innerWrapper: {
        width: 50,
        height: '50%',
        backgroundColor: colorPalette.btnPrimary,
        borderRightWidth: 1,
        justifyContent: 'center', alignContent: 'center', flexDirection: 'column'

    },
    pointer: {
        height: 10,
        width: '100%',
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        zIndex: 1000
    },
    scrollView: {
        borderWidth: 1,
        width: '100%'
    },
    scaleItem: {
        width: 100,
        height: 50,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }

})

export default styles