import { StyleSheet } from "react-native"
import { colorPalette } from "../../../assets/colorpalette/colorPalette"
import { ScreenContextType } from "../../../types/types"

const styles = (screenContext:ScreenContextType, width:number, height:number) => StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.white,
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop:screenContext.isPortrait ? height * 0.05 : height *0.3

    },
    headingContainer: {
        justifyContent:'flex-start',
        gap:width*0.04,
        flex:0.8,

    },
    buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap:width*0.04,
        flex:0.2

    }
})

export default styles