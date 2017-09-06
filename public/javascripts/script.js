
$(document).on('ready', function() {

  $("#submitLocation").on('click', function() {

      var location = $("#weatherLocation").val();

      if (!location.length) {
          showError();
          return;
      }

      // fetch lat/lng for user input
      var geoCodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(location) + "&key=AIzaSyAkpkyhJKgI5O7Pvjo1n6Zrma3P_RnaFUQ";
      var forecastIoUrl = 'https://api.darksky.net/forecast/c9ea6d269d0920d8723bf2c1f2cae9d4/';

      $.get(geoCodingUrl, function(data) {
          if (!data.results.length) {
            showError();
            return;
          }
          var coordinates = data.results[0].geometry.location
          forecastIoUrl += coordinates.lat + ',' + coordinates.lng;

          $.ajax({
            url: forecastIoUrl,
            dataType: "jsonp",
            success: function (data) {
                $("#weatherLocation").blur();
                console.log('Forecast.io', data)
                var currentConditions = data.currently;
                $("#showTemp").text(currentConditions.temperature);
                $("#showTime").text(moment(currentConditions.time, "X").format("dddd, MMMM Do YYYY, h:mm:ss a"))
                $("#showIcon").text(currentConditions.icon);
                $("#showWeather").fadeIn("fast")
                // icon, temperature, time
            }
          });
      })

      $("#weatherLocation").on('focus', function() {
        $("#showWeather").fadeOut("fast")
        $("#weatherLocation").val('');
      })

  })

  function showError() {
    alert("Please re-enter your location")
    $("#weatherLocation").val('').focus();
  }

  //  <p>Google API: </p>
  //   <p>Forecast.io: c9ea6d269d0920d8723bf2c1f2cae9d4</p>
  //   <p>https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY</p>
})