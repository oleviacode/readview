import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { BookProfilePropsArray } from '../../model';
import BookRecCard from '../bookProfile/bookRecCard';



export default function SwipeList(props:BookProfilePropsArray) {
    const books = props.bookInfo

  return (
    //swipeList component
    <SwipeListView
      useFlatList={true}
      data={books}
      disableRightSwipe={true}
      swipeToClosePercent={50}
      renderItem={(data, rowMap) => (
        <BookRecCard bookInfo={data.item} key={data.item.id} />
      )}
      renderHiddenItem={(data, rowMap) => (
        <View style={{}}>
          <TouchableOpacity onPress={() => rowMap[data.item.id].closeRow()}>
            <Text></Text>
          </TouchableOpacity>
        </View>
      )}
      leftOpenValue={75}
      rightOpenValue={-75}
      onRowOpen={(rowKey, rowMap) => {
        setTimeout(() => {
          rowMap[rowKey].closeRow();
        }, 2000);
      }}
      ></SwipeListView>
  )
}
