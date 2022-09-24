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
    height: 'auto',

    marginTop: 10,
  },
  rankBox: {
    width: 200,
    height: 'auto',
    backgroundColor: '#CCBD95',
    margin: 10,
    borderRadius: 10,
    padding: 20,
  },
  smallText: {
    fontSize: 12,
  },
  tinyText: {
    fontSize: 13,
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

  userProfileText: {
    fontSize: 20,
    paddingTop: 5,
    paddingLeft: 5,
  },

  userData: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    width: '90%',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  dataText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  textInput: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
    paddingLeft:20,
  },
  smallbook: {
    width: 60,
    height: 75,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    overflow: 'hidden',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginBottom: 10,
  },
  tinybook: {
    width: 40,
    height: 55,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    overflow: 'hidden',
    flexWrap: 'wrap',

    marginBottom: 10,
  },
});
