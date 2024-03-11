var input = document.querySelector("#input");
var form = document.querySelector("form");
var body = document.querySelector("body");
var button = document.querySelector("button");
 window.onload = ()=>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition, showError);
 }
 else{
   alert("Geolocation is not supported by this browser.");
 }
 };
 



const showPosition = (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    input.value = "Latitude:"+lat +", "+ "Longitude:"+long;
    if(input.value == ""){
      alert("Something wrong! please reload the page.")
    }else{
      form.submit();
    }
    };

    const showError = (error) =>{
      switch (error.code){
        case error.PERMISSION_DENIED:
          alert("Access to your device location is required.");
          break;

          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;

            case error.TIMEOUT:
              alert("The request to get user location timed out.");
              break;

              case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;

                default:
                  alert("An unknown error occurred.");
      }
      
    };