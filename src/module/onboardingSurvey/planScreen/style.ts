import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        paddingHorizontal: screenContext.isPortrait ? width * 0.04 : height * 0.002,
        backgroundColor: colorPalette.offWhite,
        flex: 1,
        alignItems: 'center',
        // alignSelf:'center'
    },
    cardContainer: {
        width: screenContext.isPortrait ? width * 0.9 : height * .8,
        marginVertical: screenContext.isPortrait ? width * 0.08 : width * .08,
        justifyContent: 'center',
        backgroundColor: '#95b8d1'
        , borderRadius: 20,
        elevation: 1,
        shadowColor: 'black'
    },
    cardTitle: {
        backgroundColor: '#eac4d5',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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