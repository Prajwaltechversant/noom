import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.white,
        flex: 1,
        marginVertical: screenContext.isPortrait ? height * 0.008 : height * 0.002,
        borderRadius: screenContext.isPortrait ? height * 0.01 : height * 0.002,
        elevation:5,
        shadowColor:colorPalette.black,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf:"auto"
    },
    col1: {
        flexDirection: 'column',
        width: '70%',


    },
    col2: {
        // borderWidth: 1
    },
    text: {
        color: colorPalette.black,
        fontSize: 15
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        padding: 1,
        marginVertical:5

    },
    actionBox: {
        borderWidth: 1,
        padding: 2,
        borderRadius: 5,
        width: '50%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginHorizontal: 10,
        flexDirection: 'row'
    },
    thumbnail: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 50
    }
})

export default styles