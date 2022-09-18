import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    borderBottomWidth: 1,
    marginBottom: 10,
    minHeight: 120,
    paddingBottom: 10,
  },
  searchInput: {
    flex: 1,
  },
  searchButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  resultContainer: {
    flex: 1,
  },
});
