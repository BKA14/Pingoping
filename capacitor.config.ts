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
    Keyboard: {
      resize: 'body', // or 'none', 'native', 'ionic'
      style: 'dark', // or 'light'
      resizeOnFullScreen: true,
    },
  },
};

export default config;
