import { StyleSheet } from "react-native"

export const globalStyles = StyleSheet.create({
  padding: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  screenContainer:{
    flex: 1
  }, 
  h1: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '900'
  },
  h2: {
    fontSize: 30,
    fontWeight: '900'
  },
  headerContainer: {
    height: '15%',
    paddingVertical: 10
  },
  backgroundColor: {
    backgroundColor: '#213a80',
  },
  searchBar: {
    paddingBottom: 10,
    height: '7%'
  },
  textInput: {
    color: '#fff',
    borderWidth: 1,
    borderRadius: 15,
    width: 250,
    paddingHorizontal: 10,
    borderColor: '#eee'
  },
  searchBarIcon: {
    position: 'absolute',
    top: 15,
    left: 230
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  toDetailsPressable: {
    position: 'absolute',
    right: 0,
  },
  footerContainer: {
    height: '10%',
    backgroundColor: '#eee',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    height: 100,
  },
})
