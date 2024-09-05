import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        padding: screenContext.isPortrait ? height * 0.003 : height * 0.002,
        backgroundColor: colorPalette.offWhite,
    },
    eachItem: {
        width: screenContext.isPortrait ? width : height,
        alignItems: 'center',
    },
    image: {
        width: screenContext.isPortrait ? width * .8 : height * 0.8,
        height: screenContext.isPortrait ? width * 0.5 : height * 0.2,
        resizeMode: 'cover',
        borderRadius: 5

    },
    paragraph: {
        lineHeight: 30,
        textAlign: 'justify',
        width: screenContext.isPortrait ? width * .8 : height * 0.8
    },
    pageNoIcon: {
        position: 'absolute',
        left: screenContext.isPortrait ? width * 0.11 : height * 0.1,
        zIndex: 1,
        top: screenContext.isPortrait ? height * 0.01 : width * 0.01,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        flexGrow: 1,
        padding: screenContext.isPortrait ? width * 0.01 : height * .01,
        backgroundColor:colorPalette.Lagoon,
        elevation:1,
    }
})

export default styles