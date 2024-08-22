import auth, { firebase } from '@react-native-firebase/auth';
import firestore, { doc, Filter } from '@react-native-firebase/firestore';
const currentUser = auth().currentUser?.uid;

export const addToDailyProgress1 = (item: any, selectedItem: any, quantity: number) => {
    let isExisting = false;
    let existingCount = 0;
    let docId: string;
    const startOfDay = new Date(
        new Date().setHours(0, 0, 0, 0),
    );
    const endOfDay = new Date(
        new Date().setHours(23, 59, 59, 999),
    );


    firestore()
        .collection(`UserData/${currentUser}/dailyProgress`)
        .where('id', '==', item.id)
        .where('data.id', '==', selectedItem.id)
        .where(
            'addedDate',
            '>=',
            firebase.firestore.Timestamp.fromDate(startOfDay),
          )
          .where(
            'addedDate',
            '<=',
            firebase.firestore.Timestamp.fromDate(endOfDay),
          )
        .get()
        .then(i => {
            i.size > 0 ? (isExisting = true) : (isExisting = false);
            i.forEach(item => {
                existingCount += item.data().data.count;
                docId = item.id;
            });
        })
        .finally(() => {
            if (isExisting) {
                if (quantity > 0) {
                    firestore()
                        .collection(`UserData/${currentUser}/dailyProgress`)
                        .doc(docId)
                        .update({
                            id: item.id,
                            title: item.title,
                            data: { ...selectedItem, count: quantity + existingCount },
                            itemId: selectedItem.id,
                            image: item.image,
                            addedDate: firebase.firestore.Timestamp.now(),

                        })
                        .then(i => console.log('data added'));
                }
            } else {
                if (quantity >= 0) {
                    firestore()
                        .collection(`UserData/${currentUser}/dailyProgress`)
                        .add({
                            id: item.id,
                            title: item.title,
                            data: { ...selectedItem, count: quantity },
                            itemId: selectedItem.id,
                            image: item.image,
                            addedDate: firebase.firestore.Timestamp.now(),
                        })
                        .then(i => console.log('data added'));
                }
            }

        });
    console.log(isExisting)
};

export const addToDailyProgress2 = (item: any, logValue: number) => {
    let isExisting = false;
    let existingCount = 0;
    let docId: string;
    firestore()
        .collection(`UserData/${currentUser}/dailyProgress`)
        .where('id', '==', item.id)
        .get()
        .then(i => {
            i.size > 0 ? (isExisting = true) : (isExisting = false);
            i.forEach(item => {
                existingCount += item.data().data.count;
                docId = item.id;
            });
        })
        .finally(() => {
            if (isExisting) {
                if (logValue > 0) {
                    firestore()
                        .collection(`UserData/${currentUser}/dailyProgress`)
                        .doc(docId)
                        .update({
                            id: item.id,
                            title: item.title,
                            data: { count: logValue },
                            image: item.image,
                            addedDate: firebase.firestore.Timestamp.now(),
                        })
                        .then(i => console.log('data added'));
                }
            } else {
                if (logValue >= 0) {
                    firestore()
                        .collection(`UserData/${currentUser}/dailyProgress`)
                        .add({
                            id: item.id,
                            title: item.title,
                            data: { count: logValue },
                            image: item.image,
                            addedDate: firebase.firestore.Timestamp.now(),


                        })
                        .then(i => console.log('data added'));
                }
            }

        });
};