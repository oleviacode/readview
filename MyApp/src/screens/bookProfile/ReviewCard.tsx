import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {HStack, Divider} from '@react-native-material/core';
import {styles} from '../../shared/stylesheet';
import {AirbnbRating} from '@rneui/themed';
import {useState} from 'react';
import conversion from '../../shared/conversion';
import {ReviewCardInfo} from '../../model';
import Config from 'react-native-config';

export default function ReviewCard(props: any, navigation: any) {
  const book: ReviewCardInfo = props['reviewInfo'];

  const [displayedText, setDisplayedText] = useState<string>('');
  const [fullTextSwitch, setFullTextSwitch] = useState(false);
  const [expansionButton, setExpansionButton] = useState('...more');
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    if (fullTextSwitch) {
      setDisplayedText(book['content']);
      setExpansionButton('...less');
    } else {
      const abridgedText = book['content'].slice(0, 150);
      setDisplayedText(abridgedText);

      setExpansionButton('...more');
    }

    if (book['rating'] == null) {
      setRating(0);
    }

    setRating(conversion(book['rating']));
  }, [book, fullTextSwitch, displayedText, expansionButton, rating]);

  return (
    <View>
      <HStack style={{marginTop: 20}}>
        <View style={styles.smallProfilePic}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{
              uri: `${Config.REACT_APP_BACKEND_URL}/uploads/${book['profile_picture']}`,
            }}
          />
        </View>
        <View style={{marginLeft: 20, flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            {book['username']}
          </Text>
          <HStack>
            <AirbnbRating
              isDisabled
              size={12}
              showRating={false}
              defaultRating={rating}
              count={5}
              selectedColor="#eac645"
            />
            <Text style={[styles.smallText, {color: 'grey', marginLeft: 5}]}>
              {book['updated_at'].slice(0, 10)}
            </Text>
          </HStack>
        </View>
      </HStack>
      <Text style={[styles.normalText, {marginTop: 15, marginBottom: 20}]}>
        {displayedText}
        <Text
          style={[styles.smallText, {color: 'grey'}]}
          onPress={() => setFullTextSwitch(!fullTextSwitch)}>
          {expansionButton}
        </Text>
      </Text>
      <Divider />
    </View>
  );
}
