import { StyleSheet } from "react-native";
import { colorPalette } from "../../../../assets/colorpalette/colorPalette";
import { ScreenContextType } from "../../../../types/types";

const styles = (screenContext:ScreenContextType, width:number, height:number) => StyleSheet.create({
    container: {
        flex: 1,
        padding: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        justifyContent:'space-between',alignItems:'center'

    }
    , headingText: {
        color: colorPalette.black,
        fontSize: 25,
        textAlign: 'center'
    },
    btnContainer:{
        justifyContent:'center',alignItems:'center'
    },
    btn: {
        width: screenContext.isPortrait ? width * 0.8 : width * 0.8,
        height: screenContext.isPortrait ? width * 0.12 : width * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 15
    },
    actionContainer: {
        marginVertical: screenContext.isPortrait ? height * 0.09 : height * 0.002,
        // justifyContent:'center',alignItems:'center'
    },
    btnText: {
        color: 'blue',
        fontSize:16, 
        textAlign:'center'
    }
})

export default styles