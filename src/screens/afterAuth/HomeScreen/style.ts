import { StyleSheet } from "react-native"
import { ScreenContext } from "react-native-screens"
import { ScreenContextType } from "../../../types/types"
import { colorPalette } from "../../../assets/colorpalette/colorPalette"

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({

    container: {
        // paddingTop: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.offWhite,
        flex: 1,
        alignItems: 'center',

    },
    headerContainer: {
        // borderBottomWidth: 1,
        height: screenContext.isPortrait ? width * 0.12 : width * 0.12, justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        shadowColor: colorPalette.black,
        shadowOpacity: 1,
        shadowRadius: 20,
        shadowOffset: {
            height: 1,
            width: 1
        },
        elevation: 20,
        backgroundColor: colorPalette.white
    },
    contentContainer: {
        width: width * 0.9,
        height: 'auto',
        marginVertical: height * 0.02,

    },
    headerTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dayContainer: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 2
    },
    btn: {
        borderColor: 'red',
        width: width * 0.8,
        backgroundColor: colorPalette.white,
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 1
    },
    footerBtn: {
        bottom:10,
        backgroundColor: 'red',
        position: 'absolute',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        right:10,
        


    }

})


export default styles