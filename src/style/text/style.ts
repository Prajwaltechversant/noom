import { StyleSheet } from "react-native";
import { colorPalette } from "../../assets/colorpalette/colorPalette";



const textStyle = StyleSheet.create({
    container: {

    },
    headingText: {
        fontSize: 30,
        fontWeight: '700',
        color: 'black',
        textAlign: 'center'

    },
    labelText: {
        color: colorPalette.black,
        fontSize: 15,
        fontWeight: '400',
    },
    errorText: {
        color: 'red'
    },
    questionText: {
        fontWeight: '700',
        fontSize: 25,
        color: 'black',
        textAlign:'center'
    }

})

export default textStyle