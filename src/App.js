import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

// const directionsService = new window.google.maps.DirectionsService();
// const directionsDisplay = new window.google.maps.DirectionsRenderer();
var directionsService;
var directionsDisplay;
class App extends Component {
  state = {
    map: undefined
  };

  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  initMap = () => {
    var chicago = new window.google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
      zoom: 7,
      center: chicago
    };
    this.setState(
      {
        map: new window.google.maps.Map(
          document.getElementById("map"),
          mapOptions
        )
      }, () => {console.log("map initiated")}
    );
    this.calcRoute()
  };

  calcRoute = () => {
    directionsService = new window.google.maps.DirectionsService();
    directionsDisplay = new window.google.maps.DirectionsRenderer();
    directionsDisplay.setMap(this.state.map);
    var start = "UCSD";
    var end = "UC Berkeley";
    var request = {
      origin: start,
      destination: end,
      travelMode: "DRIVING"
    };
    directionsService.route(request, function(result, status) {
      console.log(result);
      if (status == "OK") {
        console.log("here in if loop")
        directionsDisplay.setDirections(result);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    });
    console.log("done");
  };

  render() {
    return (
      <main>
        <div id="map">ds</div>
      </main>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
export default App;
