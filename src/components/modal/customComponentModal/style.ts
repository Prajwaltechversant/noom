import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        backgroundColor: 'yellow'
    },
})

export default styles