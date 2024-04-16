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

// Fungsi untuk melakukan subscribe ke notifikasi
function subscribeToNotifications() {
    messaging.getToken().then((currentToken) => {
        if (currentToken) {
            // Kirim token ke server Anda untuk disimpan
            console.log('Token:', currentToken);
            alert('Anda berhasil berlangganan notifikasi!');
        } else {
            console.log('No registration token available. Request permission to generate one.');
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
}

// Mendengarkan pesan masuk
messaging.onMessage((payload) => {
    // Menampilkan notifikasi dengan judul, isi pesan, dan foto
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.imageUrl
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Menambahkan event listener untuk tombol subscribe
document.getElementById('subscribeButton').addEventListener('click', subscribeToNotifications);
