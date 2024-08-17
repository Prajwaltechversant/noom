import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 5,
        width: width * .8
    },
    messageBox: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },
    textInput: {
        backgroundColor: colorPalette.offWhite,
        width: '80%',
        borderRadius: 0
    },
    sendBtn: {
        backgroundColor: colorPalette.salmon,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '18%'
    }
})

export default styles