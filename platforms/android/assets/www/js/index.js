var macAddress = "00:13:12:31:16:60";

var app = {

    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        sendButton.addEventListener('click', this.sendData, false);
        },

    onDeviceReady: function() {
        bluetoothSerial.connect(macAddress, app.onConnect, app.onDisconnect);
        app.getGps();
    },

    //Parte de codigo bluetooth//
    /////////////////////////////
    /////////////////////////////
    onConnect: function() {
        bluetoothSerial.subscribe('\n', app.onMessage, app.subscribeFailed);
        statusDiv.innerHTML="Please, Limit your outside-activities. Connected to " + macAddress + ".";
    },
    onDisconnect: function() {
        alert("Disconnected");
        statusDiv.innerHTML="Disconnected.";
    },
    onMessage: function(data) {
        score.innerHTML = data;
    },
    subscribeFailed: function() {
        alert("subscribe failed");
    },
    sendData: function(event) { // send data to Arduino

        var success = function() {
          resultDiv.innerHTML = resultDiv.innerHTML + "Sent: " + texto.value + "<br/>";
          resultDiv.scrollTop = resultDiv.scrollHeight;
        };

        var failure = function() {
          resultDiv.innerHTML = "Fallo el envio"  + "<br/>";
        };

        var data = texto.value;
        bluetoothSerial.write(data, success, failure);

    },

    getGps: function () {
      navigator.notification.alert("Llega hasta aqui");
      var onSuccess = function(position) {
        Latitude = position.coords.latitude;
        Longitude = position.coords.longitude;
        app.getMap(Latitude, Longitude);
    };
     function onError(error) {
         navigator.notification.alert('code: '    + error.code    + '\n' +
               'message: ' + error.message + '\n');
     };
     navigator.geolocation.getCurrentPosition(onSuccess, onError);
   },


   getMap: function (latitude, longitude) {
       var mapOptions = {
           center: new google.maps.LatLng(0, 0),
           zoom: 1,
           mapTypeId: google.maps.MapTypeId.ROADMAP
       };

       map = new google.maps.Map
       (document.getElementById("mapa"), mapOptions);


       var latLong = new google.maps.LatLng(latitude, longitude);

       var marker = new google.maps.Marker({
           position: latLong
       });

       marker.setMap(map);
       map.setZoom(15);
       map.setCenter(marker.getPosition());
      navigator.notification.alert("Llega hasta aqui too");
   }

};
