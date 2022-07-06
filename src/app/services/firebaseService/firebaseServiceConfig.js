const prodConfig = {
  apiKey: 'AIzaSyAo9XhYAvVgtVynXridFdsg4Qtb0DvgTo0',
  authDomain: 'emplosoft-2db9f.firebaseapp.com',
  projectId: 'emplosoft-2db9f',
  databaseURL: 'https://emplosoft-2db9f-default-rtdb.firebaseio.com',
  storageBucket: 'emplosoft-2db9f.appspot.com',
  messagingSenderId: '460039525265',
  appId: '1:460039525265:web:aec32080d87de88acf0030'
};
const devConfig = {
  apiKey: 'AIzaSyAo9XhYAvVgtVynXridFdsg4Qtb0DvgTo0',
  authDomain: 'emplosoft-2db9f.firebaseapp.com',
  projectId: 'emplosoft-2db9f',
  databaseURL: 'https://emplosoft-2db9f-default-rtdb.firebaseio.com',
  storageBucket: 'emplosoft-2db9f.appspot.com',
  messagingSenderId: '460039525265',
  appId: '1:460039525265:web:aec32080d87de88acf0030'
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
