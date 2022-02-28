function getlocation(){
  $.ajax({
      type:'get',
      'url':'https://geolocation-db.com/json/',
      success:function(res){
        console.log(res);
      },
      error:function(err){

      }
  })
} 


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(domain+'/firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }


    
    var firebaseConfig = {
        apiKey: apiKey,
        authDomain: authDomain,
        projectId: projectId,
        storageBucket: storageBucket,
        messagingSenderId: messagingSenderId,
        appId: appId
      };
      
      firebase.initializeApp(firebaseConfig);
      const messaging = firebase.messaging();
      
      // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    
function askclient(){ 
      messaging.requestPermission()
      .then(function() {   
    messaging.getToken({ vapidKey: vapidKey }).then((currentToken) => {
      if (currentToken) {
          console.log('to=>'+currentToken)
          /*
         $.ajax({
                url:route,
                type:'post',
                 data: {
                   "_token": csrf_token,
                    "user"  :currentToken
                 }
            }).done(function(result){
                console.log(result);
            })
            */
       
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
    
    }).catch(function(err) { 
      
        console.log('Unable to get permission to notify.', err);
    });
    
}   


$(window).scroll(function () {
  var scrollTop = $(window).scrollTop();
  if (scrollTop > 200) {
           askclient();
  }else{
      
  }
});
    
    
    messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
         const noteTitle = payload.notification.title;
            const noteOptions = {
                   body: payload.notification.body,
                   icon: payload.notification.icon,
            };
            
        new Notification(noteTitle,noteOptions);
    });
      
      
      
    getlocation();