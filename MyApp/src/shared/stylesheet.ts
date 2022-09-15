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
    width: 140,
    height: 160,
    backgroundColor: 'grey',
    borderRadius: 10,
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
});
