import firestore from '@react-native-firebase/firestore';
import { staticVariables } from '../../preferences/staticVariable';

export const fetchSurvey = async () => {
  try {
    let arr: any = staticVariables.EMPTY_ARRAY;
    firestore()
      .collection('survey')
      .get()
      .then(item => {
        item.forEach(i => {
          arr.push(i.data());
        })
      })

  } catch (error) {
    return error;
  }
};
