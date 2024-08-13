import { StyleSheet } from "react-native"
import { ScreenContext } from "react-native-screens"
import { ScreenContextType } from "../../../types/types"
import { colorPalette } from "../../../assets/colorpalette/colorPalette"

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({

    container: {
        padding: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.offWhite,
        flex: 1,
        alignItems: 'center',
    },
    headerContainer: {
        borderBottomWidth: 1,
        height: screenContext.isPortrait ? width * 0.12 : width * 0.12,justifyContent:'center',
        alignItems:'center',
    },
    contentContainer:{
        width:width*0.8,
        height:'auto',
        marginVertical:height*0.02

    },
    btn:{
        borderColor:'red',
        width:width*0.8,
        backgroundColor:colorPalette.white,
        alignItems:'center',justifyContent:'center',
        borderWidth:1
    }

})


export default styles