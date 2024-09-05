import { View, Text, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useScreenContext } from '../../../../context/screenContext';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CourseItem from '../../../../components/HomScreen components/course box';
import NoDataComponent from '../../../../components/noDataComponent';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { staticVariables } from '../../../../preferences/staticVariable';

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
  const [allRticles, setAllArticles] = useState(staticVariables.EMPTY_ARRAY)



  // listener to fetch saved articles
  useEffect(() => {
    const subscriber = firestore()
      .collection(`UserData/${currentUid}/savedArticles`)
      .onSnapshot(documentSnapshot => {
        const resData: any = documentSnapshot.docs.map(i => i.data());
        setAllArticles(resData)
      });
    return () => subscriber();
  }, []);



  // function to delete artcle from userData db
  const handleDelete = async (id: string) => {
    try {
      const querySnapshot = await firestore()
        .collection(`UserData/${currentUid}/savedArticles`)
        .where('id', '==', id)
        .get();
      if (!querySnapshot.empty) {
        await Promise.all(querySnapshot.docs.map(doc => doc.ref.delete()));
        showMessage({
          message: "Deleted From My Articles",
          type: "info",
        });
      }
    } catch (error) {
      // Alert.alert((error as Error).message)
    }
  };


  return (
    <View style={screenStyles.container}>
      <FlatList
        contentContainerStyle={{}}
        data={allRticles}
        renderItem={({ item }: any) => <CourseItem item={item} isArticle handleDelete={() => handleDelete(item.id)} />}
        ListEmptyComponent={
          <NoDataComponent />
        }
      />

    </View>
  );
};

export default MyArticleScreen;
