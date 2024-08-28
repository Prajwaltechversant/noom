import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {

    },
    card: {
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 10,
        elevation: 1,
        margin: 1,
        padding: screenContext.isPortrait ? width * 0.01 : height * 0.01,
        
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardContent: {
        fontSize: 14,
    },
    image: {
        width: width * 0.1,
        height: width * 0.1,
        // borderRadius: 50,
        resizeMode: 'cover'
    },
    cardHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardFooter:{
        alignSelf:'center'
    },
    footerBtn: {
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        


    }
})

export default styles;