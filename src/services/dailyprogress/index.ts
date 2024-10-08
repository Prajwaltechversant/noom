import auth, { firebase } from '@react-native-firebase/auth';
import firestore, { doc, Filter } from '@react-native-firebase/firestore';
const currentUser = auth().currentUser?.uid;

export const addToDailyProgress1 = async (item: any, selectedItem: any, quantity: number) => {
    firestore()
        .collection(`UserData/${currentUser}/dailyProgress`)
        .doc(`${item.id}-${selectedItem.id}`)
        .set({
            id: item.id,
            title: item.title,
            data: { ...selectedItem, count: quantity },
            itemId: selectedItem.id,
            image: item.image,
            addedDate: firebase.firestore.Timestamp.now(),
        })

};

export const addToDailyProgress2 = (item: any, logValue: number) => {
    let isExisting = false;
    let existingCount = 0;
    let docId: string;
    const date = new Date()
    const docDate = `${date.getDate()}${date.getMonth()}${date.getFullYear()}`

    firestore()
        .collection(`UserData/${currentUser}/dailyProgress`)
        .where('id', '==', item.id)
        .where('docDate', '==', docDate)
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
                            docDate: docDate
                        })
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
                            docDate: docDate
                        })
                }
            }
        });
};