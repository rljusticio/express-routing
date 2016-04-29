$(function() {
  var $h1 = $("h1");
  var $zip = $("input[name='zip']");

  $("form").on("submit", function(event) {

    // prevent the form from submitting normally
    event.preventDefault();

    var zipCode = $.trim($zip.val());
    $h1.text("Loading...");

    // sends an ajax request
    var request = $.ajax({
      url: "/" + zipCode,
      dataType: "json"
    });

    // when the request succeeds, update the header with the current temperature
    request.done(function(data){
      var temperature = data.temperature;
      $h1.html("It is " + temperature + "&#176; in " + zipCode + ".")
    });

    // if there us an error, make sure it is shown
    request.fail(function(){
      $h1.text("Error!");
    })
  });
});
