import { StyleSheet } from "react-native"
import { colorPalette } from "../../../../assets/colorpalette/colorPalette"
import { ScreenContextType } from "../../../../types/types"

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        flex: 1,
        padding: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.white
    }, headingText: {
        color: colorPalette.black,
        fontSize: 25,
        textAlign: 'center'
    },
    textInput: {
        backgroundColor: colorPalette.white,
    },
    actionContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    btnContainer: {
        flex: 1,
        marginTop: screenContext.isPortrait ? height * 0.01 : height * 0.002,
        marginBottom: screenContext.isPortrait ? height * 0.07 : height * 0.08,
    },
    textInputContainer: {
        paddingVertical: 30
    },
    subtBtn: {
        width: screenContext.isPortrait ? width * 0.9 : width * 0.8,
        borderRadius: 0,
        height: screenContext.isPortrait ? width * 0.12 : width * 0.12,
        justifyContent: 'center', alignItems: 'center',


    },
    signupBtn: {
        width: screenContext.isPortrait ? width * 0.9 : width * 0.8,
        // borderRadius: 0,
        height: screenContext.isPortrait ? width * 0.12 : width * 0.12,
        justifyContent: 'center', alignItems: 'center',
        marginVertical: screenContext.isPortrait ? height * 0.02 : height * 0.01,
        borderRadius: 10
    },
    btnText: {
        color: colorPalette.white
    }
})

export default styles