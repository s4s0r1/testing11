// Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvSb4Z09Cb6GgN-oCI05tsTpA8oWlbLCo",
    authDomain: "broadcastnotification-80fd9.firebaseapp.com",
    projectId: "broadcastnotification-80fd9",
    storageBucket: "broadcastnotification-80fd9.appspot.com",
    messagingSenderId: "1001002027993",
    appId: "1:1001002027993:web:07d83621b8ea73b19967c8",
    measurementId: "G-G2C0KXVS09"
};

// Function to request notification permission
function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            // Initialize Firebase
            const app = firebase.initializeApp(firebaseConfig);

            // Initialize Firebase Cloud Messaging and get a reference to the service
            const messaging = firebase.messaging(app);
            messaging.getToken({ vapidKey: 'BGdt-g4are3Pd6K6z6OxNjwYEP-jwJwpPV_9EdusGbjOFUCjV6DvYiR8dD03UNYwNT3sCsZ8tY7ZaUsGe0WiV28' })
                .then((currentToken) => {
                    if (currentToken) {
                        console.log('currentToken: ', currentToken);
                    } else {
                        console.log('Can not get token: ');
                    }
                });

            // Listen for incoming messages
            messaging.onMessage((payload) => {
                console.log('Message received. ', payload);
                // Handle the message and display the notification
                const notificationTitle = payload.notification.title;
                const notificationOptions = {
                    body: payload.notification.body,
                    icon: payload.notification.icon,
                    image: payload.notification.image // adding image to the notification
                };
                new Notification(notificationTitle, notificationOptions);
            });
        } else {
            console.log('Do not have permission!')
        }
    });
}

// Function to display subscription popup
function showSubscriptionPopup() {
    // Create HTML elements for the popup
    const popupContainer = document.createElement('div');
    popupContainer.setAttribute('id', 'subscriptionPopup');
    popupContainer.style.position = 'fixed';
    popupContainer.style.top = '50%';
    popupContainer.style.left = '50%';
    popupContainer.style.transform = 'translate(-50%, -50%)';
    popupContainer.style.background = '#ffffff';
    popupContainer.style.padding = '20px';
    popupContainer.style.border = '2px solid #000000';
    popupContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    popupContainer.style.zIndex = '9999';

    const popupTitle = document.createElement('h2');
    popupTitle.textContent = 'Subscribe to Notifications';
    popupContainer.appendChild(popupTitle);

    const popupText = document.createElement('p');
    popupText.textContent = 'Do you want to receive notifications from us?';
    popupContainer.appendChild(popupText);

    const subscribeButton = document.createElement('button');
    subscribeButton.textContent = 'Subscribe';
    subscribeButton.style.marginRight = '10px';
    subscribeButton.onclick = function () {
        // Call function to request permission when the button is clicked
        requestPermission();
        // Remove the popup after subscribing
        document.body.removeChild(popupContainer);
    };
    popupContainer.appendChild(subscribeButton);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.onclick = function () {
        // Remove the popup if the user cancels
        document.body.removeChild(popupContainer);
    };
    popupContainer.appendChild(cancelButton);

    // Append the popup to the body of the document
    document.body.appendChild(popupContainer);
}

// Check if the page has loaded
document.addEventListener("DOMContentLoaded", function () {
    // Show subscription popup when the page is loaded
    showSubscriptionPopup();
});
