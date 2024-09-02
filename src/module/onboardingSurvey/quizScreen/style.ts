import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        padding: screenContext.isPortrait ? height * 0.03 : height * 0.03,
        backgroundColor: colorPalette.white,
        flex: 1,
        // alignItems: 'center',
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%'
    },
    optionContainer: {
        width: screenContext.isPortrait ? width * 0.8 : height * 0.8,
        height: screenContext.isPortrait ? height * .4 : height * .2,
        justifyContent: 'center',

    },
    options: {
        width: '100%',
        height: screenContext.isPortrait ? width * 0.4 : '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },
    optionBox: {
        width: screenContext.isPortrait ? width * 0.3 : width * 0.6,
        height: screenContext.isPortrait ? width * 0.4 : width * 0.3,
        justifyContent: 'center', alignContent: 'center', alignItems: 'center',
        backgroundColor: colorPalette.offWhite,
        borderRadius: 5,
        borderColor: colorPalette.sand,
        padding: 1,
        elevation: 1

    },
    optionSeparator: {
        width: screenContext.isPortrait ? width * 0.1 : width * 0.1,
        height: screenContext.isPortrait ? width * 0.3 : width * 0.2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    seperatorBar: {
        width: 'auto',
        height: screenContext.isPortrait ? width * 0.1 : width * 0.1,
    },
    answerContainer: {
        width: screenContext.isPortrait ? '100%' : height * 0.9,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',

    },
    sliderView: {
        width: '100%',
        height: width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dragIcon: {
        width: screenContext.isPortrait ? width * 0.1 : width * 0.1,
        height: screenContext.isPortrait ? width * 0.1 : width * 0.1,
        borderWidth: 1,
        position: 'absolute',
        borderRadius: 20,
        justifyContent: 'center', alignItems: 'center',
        bottom: screenContext.isPortrait ? width * 0.03 : height * 0.09
    },
    hintContainer: {
        backgroundColor: colorPalette.sand,
        alignItems: 'center'
    }
})


export default styles;