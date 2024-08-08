import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        paddingTop: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.white,
        flex: 1,
        alignItems: 'center'
    },
    contentContainer: {

    },
    optionContainer: {
        width: screenContext.isPortrait ? width * 0.8 : width * .8,
        height: screenContext.isPortrait ? height * .5 : width * .2,
        borderWidth: 1,
        justifyContent:'center'
    },
    options: {
        width: '100%',
        height: screenContext.isPortrait ? width * 0.5 : width *.3,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems:'center'
    },
    optionBox: {
        width: screenContext.isPortrait ? width*0.3 : width *0.2,
        height: screenContext.isPortrait ? width*0.3 : width *0.2,
        borderWidth: 1

    },
    optionSeparator: {
        width: screenContext.isPortrait ? width*0.1 : width *0.1,
        height: screenContext.isPortrait ? width*0.3 : width *0.2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1
    },
    seperatorBar: {
        width: 'auto',
        height: screenContext.isPortrait ? width*0.1 : width *0.1,
        borderWidth: 1
    },
    sliderView:{
        width:'100%',
        borderWidth:2,
        height:50,
        justifyContent:'center',
        alignItems:'center'
    }
})


export default styles;