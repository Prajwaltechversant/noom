import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        padding: height * 0.001,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    msgContainer: {

    }
})

export default styles