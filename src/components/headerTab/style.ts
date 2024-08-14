import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        borderWidth: 1,
        marginRight: 10,
        width: width * 0.4,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})

export default styles;