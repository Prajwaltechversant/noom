import { StyleSheet } from "react-native";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";
import { ScreenContextType } from "../../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({

    container: {
        paddingTop: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.white,
        flex: 1,
    },
    contentContainer: {
        backgroundColor: colorPalette.sand,
        paddingTop: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'


    },
    image: {
        width: screenContext.isPortrait ? width * 0.8 : width * 0.8,
        height: screenContext.isPortrait ? width * 0.4 : width * 0.4
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'

    },
    box: {
        width: screenContext.isPortrait ? width * 0.2 : width * 0.2,
        height: screenContext.isPortrait ? width * 0.2 : width * 0.2,
        borderWidth: 1,
        backgroundColor: colorPalette.white,
        borderColor: colorPalette.sand,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }


})

export default styles