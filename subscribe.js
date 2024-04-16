// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCvSb4Z09Cb6GgN-oCI05tsTpA8oWlbLCo",
    authDomain: "broadcastnotification-80fd9.firebaseapp.com",
    projectId: "broadcastnotification-80fd9",
    storageBucket: "broadcastnotification-80fd9.appspot.com",
    messagingSenderId: "1001002027993",
    appId: "1:1001002027993:web:07d83621b8ea73b19967c8",
    measurementId: "G-G2C0KXVS09"
};

// Inisialisasi Firebase app
const app = firebase.initializeApp(firebaseConfig);

// Inisialisasi Firebase Cloud Messaging dan dapatkan referensi layanan
const messaging = firebase.messaging();

// Minta izin notifikasi
function requestPermission() {
    if ('Notification' in window) {
        console.log('Requesting permission...');
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                // Dapatkan token menggunakan Firebase Cloud Messaging
                messaging.getToken().then((currentToken) => {
                    if (currentToken) {
                        console.log('Current token:', currentToken);
                        alert('Izin notifikasi berhasil diberikan!');
                    } else {
                        console.log('No registration token available. Request permission to generate one.');
                    }
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                });
            } else {
                console.log('No permission to show notifications.');
            }
        });
    } else {
        console.log('This browser does not support notifications.');
    }
}
