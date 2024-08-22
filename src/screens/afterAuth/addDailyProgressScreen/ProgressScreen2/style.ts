import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../../types/types";
import { colorPalette } from "../../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'space-evenly',
        paddingHorizontal: width * 0.01
    },
    headerContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.8,
        margin: height * 0.01,
    },

    btnConatiner: {
        bottom: 0,
        position: 'absolute'
    },
    goalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: colorPalette.black,
        fontWeight: '800'

    },
    resultContainer: {
        // borderWidth: 1,
        marginVertical: height * 0.1,
        padding: width * 0.1,
        borderRadius: 20,
        elevation: 5,
        backgroundColor: colorPalette.sky,
        width: width * 0.8,
        justifyContent: 'space-evenly'
    },
    scaleView: {
        backgroundColor: colorPalette.offWhite,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        borderRadius: 10,
        padding: 10
    }
})

export default styles