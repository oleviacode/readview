import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  regularBox: {
    width: '100%',
    height: 'auto',
    padding: 20,

    marginTop: 20,
    borderRadius: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bookStack: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  book: {
    width: 120,
    height: 150,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    overflow: 'hidden',
  },
  rankingSection: {
    height: 250,
    backgroundColor: 'pink',
    marginTop: 10,
  },
  rankBox: {
    width: 200,
    height: 210,
    backgroundColor: 'grey',
    margin: 10,
    borderRadius: 10,
  },
  smallText: {
    fontSize: 12,
  },
  normalText: {
    fontSize: 16,
  },
  quoteText: {
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 10,
  },
  smallProfilePic: {
    width: 40,
    height: 40,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
  },
  userProfileText : {
    fontSize: 20,
    paddingTop: 5,
    paddingLeft: 5,
  }
});
