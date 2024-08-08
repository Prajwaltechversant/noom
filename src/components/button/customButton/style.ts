import { StyleSheet } from "react-native";

const styles = (screenContext: any, width: number, height: number, btnColor: string,
    labelColor: string | undefined, icon: string | undefined,leftIcon:boolean | undefined) => StyleSheet.create({


        btn: {
            backgroundColor: btnColor,
            width,
            height,
            flexDirection:icon || leftIcon ? 'row' :'column',
            justifyContent:leftIcon ? 'flex-start': 'center',
            alignItems: 'center',
            marginVertical: screenContext.isPortrait ? width * 0.03 : 0.01,
            gap: screenContext.isPortrait ? width * 0.05 : 0.01,
        },
        icon: {
            // marginHorizontal:screenContext.isPortrait ? width * 0.1 : 0.01

        }

    })

export default styles