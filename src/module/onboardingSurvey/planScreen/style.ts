import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        // paddingTop: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.white,
        flex: 1,
        alignItems: 'center',
    },
    cardContainer: {
        width: screenContext.isPortrait ? width * 0.9 : width * .8,
        marginVertical: screenContext.isPortrait ? width * 0.08 : width * .08,
        justifyContent: 'center',
        backgroundColor: colorPalette.sand
        , borderRadius: 20,
        elevation: 5
    },
    cardTitle: {
        backgroundColor: colorPalette.blossom,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
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
        alignItems: 'center',
    },
    pointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    
        marginVertical: screenContext.isPortrait ? width * 0.03 : width * .02,

    },
    tickIcon: {
        backgroundColor: '#51D71B',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: 15, height: 15
    },
    cardBody: {
        paddingVertical: screenContext.isPortrait ? width * 0.03 : width * .02
    },
    skipButton: {
        alignItems: 'center'
    }


})

export default styles