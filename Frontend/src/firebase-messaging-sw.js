importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDW-r-OfXtoUtST1w7_Fv7MwaEieZLkMVE",
  authDomain: "pingoping.firebaseapp.com",
  projectId: "pingoping",
  storageBucket: "pingoping.appspot.com",
  messagingSenderId: "991351287389",
  appId: "1:991351287389:web:0b00d7fd640926d71ee7b4",
  measurementId: "G-8NT6MEZ00K"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Extraction des informations de la notification
  const notificationTitle = payload.notification.title || 'Nouvelle notification';
  const notificationOptions = {
    body: payload.notification.body || 'Vous avez reçu un nouveau message.',
    icon: payload.notification.icon || '/assets/notif_icon.png',  // Icône de notification
    badge: '/assets/notif_icon.png',  // Icône pour le badge (dans l'onglet ou sur l'app)
    image: payload.notification.image || undefined,  // Image affichée dans la notification
    vibrate: [200, 100, 200],  // Schéma de vibration pour la notification
    actions: [
      {
        action: 'view',  // Identifiant de l'action
        title: 'Voir',
      //  icon: 'images/view_icon.png'  // Icône pour l'action "Voir"
      },
      {
        action: 'dismiss',  // Identifiant de l'action
        title: 'Ignorer',
      //  icon: 'images/dismiss_icon.png'  // Icône pour l'action "Ignorer"
      }
    ],
    data: {
      url: payload.notification.click_action || '/'  // URL à ouvrir lorsque la notification est cliquée
    }
  };

  // Affichage de la notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Gestion du clic sur la notification
self.addEventListener('notificationclick', function(event) {
  const clickedNotification = event.notification;
  clickedNotification.close();

  // Vérifier l'action cliquée et effectuer la navigation correspondante
  if (event.action === 'view') {
    clients.openWindow(event.notification.data.url);
  } else {
    // Autres actions ou actions par défaut
    event.waitUntil(clients.openWindow('/'));
  }
});

