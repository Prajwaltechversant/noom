import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../../types/types";
import { colorPalette } from "../../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: screenContext.isPortrait ? width * 0.01 : height * 0.1,
        paddingTop: screenContext.isPortrait ? width * 0.01 : height * 0.01
    },
    headerContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.8,
        margin: screenContext.isPortrait ? height * 0.01 : height * 0.001,
    },

    btnConatiner: {
        // bottom: 0,
        // position: 'absolute'
    },
    goalText: {
        fontSize: 18,
        color: colorPalette.black,
        fontWeight: '800',
    },
    resultContainer: {
        // borderWidth: 1,
        marginVertical: screenContext.isPortrait ? height * 0.1 : width * 0.04,
        borderRadius: 20,
        elevation: 5,
        backgroundColor: colorPalette.sky,
        width: width * 0.8,
        justifyContent: 'center',
        height: screenContext.isPortrait ? width * 0.3 : height * 0.1,
        borderWidth: 1,
        alignItems: 'center',
    },
    scaleView: {
        backgroundColor: colorPalette.offWhite,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        borderRadius: 10,
        // borderWidth: 1,
        margin:1
    },
    headerImage: {
        width: width * 0.08,
        height: width * 0.08,
        resizeMode: 'center'

    }
})

export default styles