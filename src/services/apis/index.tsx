import firestore from '@react-native-firebase/firestore';

export const fetchSurvey = async () => {
  try {
    let arr: any = [];
    firestore()
      .collection('survey')
      .get()
      .then(item => {
        item.forEach(i => {
          arr.push(i.data());
        })
      })
      console.log(arr);

  } catch (error) {
    return error;
  }
};
