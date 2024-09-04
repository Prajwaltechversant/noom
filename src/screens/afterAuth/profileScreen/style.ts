import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {

        alignItems: 'center',
        backgroundColor: colorPalette.white,

    },
    keyboardAvoidingContainer: {
        padding: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.white,
        flex: 1,
    },
    profileSection: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: width * 0.8,
    },
    profileIcon: {
        width: screenContext.isPortrait ? width * 0.2 : width * 0.1,
        borderWidth: 1,
        borderRadius: 50,
        height: screenContext.isPortrait ? width * 0.2 : width * 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        resizeMode: 'cover'
    }

})

export default styles