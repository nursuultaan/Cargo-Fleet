const prodConfig = {
  apiKey: 'AIzaSyCqs1uJ80Q0YLP2TR3yNnnK5p9wg-YD6XI',
  authDomain: 'https://cargo-fleet-website.netlify.app/',
  databaseURL: 'https://cargofleet24-default-rtdb.firebaseio.com',
  projectId: 'cargofleet24',
  storageBucket: 'cargofleet24.appspot.com',
  messagingSenderId: '1086559816564',
  appId: '1:1086559816564:web:8351b0c2b43cf3021e3a21'
};
const devConfig = {
  apiKey: 'AIzaSyCqs1uJ80Q0YLP2TR3yNnnK5p9wg-YD6XI',
  authDomain: 'http://localhost:3000/',
  databaseURL: 'https://cargofleet24-default-rtdb.firebaseio.com',
  projectId: 'cargofleet24',
  storageBucket: 'cargofleet24.appspot.com',
  messagingSenderId: '1086559816564',
  appId: '1:1086559816564:web:8351b0c2b43cf3021e3a21'
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
