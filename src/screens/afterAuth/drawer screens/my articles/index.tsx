import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useScreenContext } from '../../../../context/screenContext';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CourseItem from '../../../../components/HomScreen components/course box';
import NoDataComponent from '../../../../components/noDataComponent';

const MyArticleScreen = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;

  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const currentUid = auth().currentUser?.uid;
  const [allRticles, setAllArticles] = useState([])

  useEffect(() => {
    const subscriber = firestore()
      .collection(`UserData/${currentUid}/savedArticles`)
      .onSnapshot(documentSnapshot => {
        const resData: any = documentSnapshot.docs.map(i => i.data());
        setAllArticles(resData)
      });
    return () => subscriber();
  }, []);


  const handleDelete = async (id: string) => {
    try {
      const querySnapshot = await firestore()
        .collection(`UserData/${currentUid}/savedArticles`)
        .where('id', '==', id)
        .get();

      if (!querySnapshot.empty) {
        await Promise.all(querySnapshot.docs.map(doc => doc.ref.delete()));
        console.log('deleted');
      } else {
        console.log('No data');
      }
    } catch (error) {
      console.error('Error... ', error);
    }
  };
  return (
    <View style={screenStyles.container}>
      <FlatList

        data={allRticles}
        renderItem={({ item }: any) => <CourseItem item={item} isArticle handleDelete={() => handleDelete(item.id)} />}


        ListEmptyComponent={
          <NoDataComponent  />

        }
      />

    </View>
  );
};

export default MyArticleScreen;
