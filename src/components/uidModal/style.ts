import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../types/types";

const styles = (screenContext:ScreenContextType, width:number, height:number) => StyleSheet.create({
    container: {
        flex: 1
    },
    btnText: {
        color: 'blue',
        fontSize: 16,
        textAlign: 'center'
    }
})

export default styles