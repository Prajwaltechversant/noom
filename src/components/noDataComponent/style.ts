import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {

    },
    animationView:{height:height*.8,width:width*.8,justifyContent:'center',alignItems:'center'}

})
export default styles