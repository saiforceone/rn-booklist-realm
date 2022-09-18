import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
  },
  searchInput: {
    flex: 1,
  },
  resultContainer: {
    flexGrow: 1,
  },
});
