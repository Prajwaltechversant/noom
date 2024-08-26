import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        height,
        alignItems: 'center'
    },
    addBtn: {
        marginRight: width * 0.1,
        backgroundColor: colorPalette.white,
        borderWidth: 2,
        borderColor: colorPalette.mint,
        width: width * 0.2,
        height: height * 0.03,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    tittleContainer: {
        // borderWidth: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        elevation: 1,
        margin: 1,
        width: width * 0.8,
        alignItems: 'center'
    },
    weightCircle: {
        backgroundColor: colorPalette.berry,
        height: height * 0.07,
        width: height * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    weightText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '800',
        textAlignVertical: 'center',
        textDecorationColor: 'red',
        color:colorPalette.white
    },
    headerBtn:{
        marginRight:width*.1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        backgroundColor:colorPalette.Lagoon,
        padding:2,
        borderRadius:10,
        width:width*.2
    }
})

export default styles