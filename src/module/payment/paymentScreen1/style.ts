import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.white,
        flex: 1,
        justifyContent:'space-evenly'
    },
    headerContainer: {
        backgroundColor: colorPalette.offWhite,
        width: '100%',
        paddingHorizontal: screenContext.isPortrait ? height * 0.03 : height * 0.002,

    },
    headerText: {
        marginVertical: screenContext.isPortrait ? height * 0.01 : height * 0.002,
        fontSize: 20,
        color: colorPalette.black,
        fontWeight: '500'
    },
    paymentContainer: {
        marginVertical: screenContext.isPortrait ? height * 0.02 : height * 0.002,
        alignItems: 'center',
        height: 'auto',
        flex:1,
        // justifyContent:'space-between',

    },
    amountBox: {
        backgroundColor: colorPalette.sand,
        height: 50,
        width: 50,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
        borderRadius: 5,
        borderWidth:1


    },
    amountContainer: {
        alignItems: 'center',
        height: screenContext.isPortrait ? height * 0.2 : height * 0.1,
        justifyContent: 'center',

    },
    amountText: {
        color: colorPalette.stream
    }
})

export default styles