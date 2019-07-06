import React, {Fragment} from 'react';


import AppNav from './AppNav'

import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore()

store.subscribe(() => console.log('store', store.getState()));
// const store = createStore(todoApp)

const App = () => {
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
    // {/* <Fragment>
    //
    //   <AppNav/>
    // </Fragment> */}
  );
};

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
