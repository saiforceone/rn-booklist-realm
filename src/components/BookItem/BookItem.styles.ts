import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10,
    padding: 5,
  },
  bookContainer: {
    flex: 1,
    marginRight: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookSummary: {
    fontSize: 14,
    lineHeight: 14 * 1.35,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
