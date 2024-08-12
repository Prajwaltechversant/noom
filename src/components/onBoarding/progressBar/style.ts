import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        height: screenContext.isPortrait ? height * 0.1 : height * 0.1,
        backgroundColor: colorPalette.salmon,
        justifyContent: 'center',
        paddingHorizontal: screenContext.isPortrait ? width * 0.01 : width * 0.1

    },
    animatedContainer: {
        height: screenContext.isPortrait ? height * 0.02 : height * 0.1,
        width: '100%',
        backgroundColor: colorPalette.salmon,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth:1

    },
    fill: {
        height: '100%',
        backgroundColor: '#76c7c0',
        borderRadius: 10,

    },
    progressBarHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal:10
    }
})

export default styles;