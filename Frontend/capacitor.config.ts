import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'pingoping',
  webDir: 'www',
  server: {
    androidScheme: 'http'
  }
};

export default config;
