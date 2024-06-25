const prodConfig = {
  apiKey: process.env.CF_APP_API_KEY,
  authDomain: process.env.CF_APP_AUTH_DOMAIN,
  databaseURL: process.env.CF_APP_DATABASE_URL,
  projectId: process.env.CF_APP_PROJECT_ID,
  storageBucket: process.env.CF_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.CF_APP_MESSAGING_SENDER_ID,
  appId: process.env.CD_APP_APP_ID
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
