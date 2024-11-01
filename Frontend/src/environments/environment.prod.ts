// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging/sw";
import { getToken, onMessage } from "firebase/messaging";
import { Capacitor } from '@capacitor/core';


export const environment = {
  production: false,
  apiKey: "AIzaSyDW-r-OfXtoUtST1w7_Fv7MwaEieZLkMVE",
  authDomain: "pingoping.firebaseapp.com",
  projectId: "pingoping",
  storageBucket: "pingoping.appspot.com",
  messagingSenderId: "991351287389",
  appId: "1:991351287389:web:0b00d7fd640926d71ee7b4",
  measurementId: "G-8NT6MEZ00K",
  vapidKey: "BOvGjt2PLjuyVba6mnyopaY8QfvxTnQ2Dg70D1V4TM88YiflHwENAkOxznyKjJPVuZEdZzPfDhVN_YUp9P5JGOA"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
