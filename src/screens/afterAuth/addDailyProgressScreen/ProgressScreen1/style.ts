import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../../types/types";
import { colorPalette } from "../../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        backgroundColor: colorPalette.offWhite,
        flex: 1,
        alignItems: 'center',
    },
    searchBoxContainer: {
        width: width * 0.9,
        backgroundColor: colorPalette.offWhite,
        elevation: 5,
        borderRadius: 4,
        alignItems: 'center',
        margin: 1
    },
    textInput: {
        width: width * 0.9,

    },
    listContainer: {
        width: width * 0.9,
        marginVertical: height * 0.04,
        height: 'auto',
        borderRadius: 4,

    },
    item: {
        height: height * .06,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colorPalette.white,
        marginVertical: height * 0.01,
        borderRadius: 5,
        elevation: 5,
        flexDirection: 'row',
        margin: 1
        ,
        paddingHorizontal: 10
    },
    addQuantiyBox: {
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: colorPalette.mint,
        height: 60,
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 60
    },
    itemImage: {
        height: 40,
        width: 40,
        borderRadius: 50,
        resizeMode: 'cover'
    },
    imageLoadingIndicator:
        { position: 'absolute', justifyContent: 'center', alignItems: 'center' }

})

export default styles