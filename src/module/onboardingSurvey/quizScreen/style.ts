import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        paddingTop: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.white,
        flex: 1,
        alignItems: 'center'
    },
    contentContainer: {
        alignItems: 'center'

    },
    optionContainer: {
        width: screenContext.isPortrait ? width * 0.8 : width * .8,
        height: screenContext.isPortrait ? height * .4 : width * .2,
        justifyContent: 'center',

    },
    options: {
        width: '100%',
        height: screenContext.isPortrait ? width * 0.4 : width * .3,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    optionBox: {
        width: screenContext.isPortrait ? width * 0.3 : width * 0.2,
        height: screenContext.isPortrait ? width * 0.4 : width * 0.2,
        justifyContent: 'center', alignContent: 'center', alignItems: 'center',
        backgroundColor: colorPalette.offWhite,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colorPalette.sand
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
        borderWidth: 1
    },
    answerContainer: {
        width: width * 0.9,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
    },
    sliderView: {
        width: width * 0.8,
        // borderWidth: 2,
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
        justifyContent: 'center', alignItems: 'center'
    },
    hintContainer: {
        backgroundColor: colorPalette.sand,
        alignItems: 'center'
    }
})


export default styles;