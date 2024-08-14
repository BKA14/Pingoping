import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pingoping.bf',
  appName: 'pingoping',
  webDir: 'www',
  server: {
    androidScheme: 'http'
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    SplashScreen: {
      launchShowDuration: 3000, // Durée d'affichage en millisecondes
      autoHide: false, // Ne pas cacher automatiquement le splashscreen
    },
    Keyboard: {
      resize: 'body', // or 'none', 'native', 'ionic'
      style: 'dark', // or 'light'
      resizeOnFullScreen: true,
    },
  },
};

export default config;
