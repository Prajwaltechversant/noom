import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.white,
        // flex: 1,
        justifyContent: 'space-between',
    },
    headerContainer: {
        backgroundColor: colorPalette.offWhite,
        width:'100%'
    },
    chartWrapper: {
        borderRadius: 20,
        height: screenContext.isPortrait ? height * 0.5 : height * 0.3,
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