import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        paddingTop: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.sand,
        flex: 1,
        alignItems: 'center'
    },
    cardContainer: {
        width: screenContext.isPortrait ? width * 0.8 : width * .8,
        marginVertical: screenContext.isPortrait ? width * 0.08 : width * .08,
        justifyContent: 'center',
        backgroundColor: colorPalette.sand1
    },
    cardTitle: {
        backgroundColor: colorPalette.blossom,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    imageContainer: {
        justifyContent: 'center', alignItems: 'center'
    },

    title: {
        textAlign: 'center'

    },
    actionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    descriptionContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    pointsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 10,
        marginVertical: screenContext.isPortrait ? width * 0.03 : width * .02,

    },
    tickIcon: {
        backgroundColor: 'green',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: 15, height: 15
    },
    cardBody: {
        paddingVertical: screenContext.isPortrait ? width * 0.03 : width * .02
    },
    skipButton:{
        alignItems:'center'
    }


})

export default styles