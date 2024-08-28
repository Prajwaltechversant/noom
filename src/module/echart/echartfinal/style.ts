import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colorPalette.white,
        justifyContent: 'center',
        marginVertical:10
    },
    headerContainer: {
        backgroundColor: colorPalette.offWhite,
        width:'100%',
        borderWidth:1

    },
    chartWrapper: {
        borderRadius: 20,
        height: screenContext.isPortrait ? height * 0.5 : height * 0.4,
        width: screenContext.isPortrait ? width * .8 : width * .8,
        justifyContent: 'center',
        alignContent: 'center',
        elevation: 20
    },
    chartContainer: {
        width: screenContext.isPortrait ? width * .8 : width * .8,
        height: screenContext.isPortrait ? height * 0.5 : height * 0.3,
        alignItems: 'center'
    }
})

export default styles