import PostData from '../data/paths.json'
import attractionData from '../data/attractions.json'
import React, { Component } from 'react'
import '../App.css'
import MapDropdown from './MapDropdown'
import ControlledExpansionPanels from "./About";
import Home from "./Home"

// import axios from 'axios'

class Maps extends Component {
  constructor(props) {
    super(props);
    this.origin='Georgia Tech';
    this.destination= 'Atlanta Botanical Garden';
    this.travelMode= 'DRIVING';
    this.startlat=37.4224764
    this.startlng=-122.0842499
    this.endlat=37.45
    this.endlng=-122.0942499
    this.paths = PostData;
    this.directionsService="",
    this.directionsDisplay="",
    this.map = "",
    this.markers = [];
    this.state = {
        paths: [],
        selectedPath: "",
        showDescription:false
      }

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3=this.handleChange3.bind(this);
    this.handleChange4=this.handleChange4.bind(this);
    this.handleChange5=this.handleChange5.bind(this);
    this.attractions = this.props.location.state.form;
  }
  componentDidMount() {
    
    this.renderMap()
    this.setState({
        paths: PostData,
        selectedPath: PostData[0].title,
      })
    
  }
  
   
  
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=XXX&callback=initMap&libraries=geometry,places")
    window.initMap = this.initMap
  }
  
  initMap = () => {
    var directionsDisplay = new window.google.maps.DirectionsRenderer;
    var directionsService = new window.google.maps.DirectionsService;
    
    var center = {lat: 41.85, lng: -87.65}
    var map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 37.773972, lng: -122.431297}
    });
    this.directionsService=directionsService;
    this.map = map;
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('down-panel'));
    this.directionsDisplay=directionsDisplay;
    var origin='Georgia Tech';
    var destination= 'Atlanta Botanical Garden';
    var travelMode= 'DRIVING';
    // this.calculateAndDisplayRoute(directionsService, directionsDisplay,map,this.renderDirections,origin,destination,travelMode);
    // this.calculateAndDisplayRoute2(directionsService, this.directionsDisplay,map,this.renderDirections);   
    this.handleChange3();   
   
  }
  handleChange(e) {
    alert("Hello World");
    let value = e.target.value;
    console.log(value)
    this.setState({ selectedPath: value });
    let found = findArrayElementByTitle(this.paths, value);
    this.startlat=found.start.lat;
    this.endlat=found.end.lat;
    this.startlng=found.start.lng;
    this.endlng=found.end.lng;
    this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay,this.map,this.renderDirections); 

    console.log(this.paths);
    console.log(found.start.lat)
  }


  // show route for transit
  handleChange2(toDisplay,startlat,startlng,endlat,endlng,travelMode) {
    if(this.markers.length>0)
    this.markers[0].setMap(null);
    this.setState(oldState => ({ showDescription: false }));
    this.startlat=startlat;
    this.endlat=endlat;
    this.startlng=startlng;
    this.endlng=endlng;
    this.travelMode= travelMode;
    this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay,this.map,this.renderDirections); 
  }

  // overview change
  handleChange3() {
    if(this.markers.length>0) {
    this.markers[0].setMap(null);
    }
    this.setState(oldState => ({ showDescription: false }));
    this.calculateAndDisplayRoute2(this.directionsService, this.directionsDisplay,this.map,this.renderDirections); 
  }

  // visit attraction change
  handleChange4(lat, lng, title) {
    if(this.markers.length>0)
    this.markers[0].setMap(null);
    console.log(title)  
    this.setState(oldState => ({ showDescription: false }));
    var infowindow = new window.google.maps.InfoWindow({
      content: '<div><p><b>'+title+'</b></p></div>'
    });

    var marker = new window.google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: this.map,
      title: title
    });
    infowindow.open(this.map, marker);
    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });
    this.map.setCenter({lat:lat, lng:lng});
    this.markers[0]=marker;
    // this.markers.push(marker);
    this.directionsDisplay.setPanel(null);
    this.directionsDisplay.setMap(null);
  }
  handleChange5(title, description) {
    this.setState(oldState => ({ showDescription: true }));
    var ti = this.document.getElementById("attraction-title")
    var de = this.document.getElementById("attraction-description")
    de.set  
  }
  calculateAndDisplayRoute(directionsService, directionsDisplay,map,renderDirections) {
    directionsService.route({
      origin: new window.google.maps.LatLng(this.startlat, this.startlng),
      destination: new window.google.maps.LatLng(this.endlat, this.endlng),
      travelMode: this.travelMode
   }, function(response, status) {
     console.log(response)
     if (status === 'OK') {
      directionsDisplay.setMap(map)
      directionsDisplay.setPanel(document.getElementById('down-panel'));
       directionsDisplay.setDirections(response);
      // renderDirections(response, map)
     } else {
       window.alert('Directions request failed due to ' + status);
     }
   });
 }
 

calculateAndDisplayRoute2(directionsService, directionsDisplay,map,renderDirections) {
  // console.log(this.attractions)
  //  console.log(this.attractions[this.attractions.length-1].attraction)
   var start = this.attractions[0].attraction;
   var end = this.attractions[this.attractions.length-1].attraction;
   var waypts = [];
        for (var i = 1; i < this.attractions.length-1; i++) {
          var wp = this.attractions[i].attraction;
            waypts.push({
              location: new window.google.maps.LatLng(wp.lat, wp.lng),
              stopover: true
            });
        }
        // console.log(waypts)
        directionsDisplay.setPanel(null);
    this.directionsService.route({
      origin: new window.google.maps.LatLng(start.lat, start.lng),
      destination: new window.google.maps.LatLng(end.lat, end.lng),
      waypoints: waypts,
      travelMode: this.travelMode
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setMap(map)
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
  
}
  renderDirections=(result, map) => { 
    var directionsRenderer = new window.google.maps.DirectionsRenderer({
    map: map,
    suppressMarkers: true
  }); 
  var directionsService = new window.google.maps.DirectionsService({
    map: map,
    suppressMarkers: true
  }); 
    directionsRenderer.setMap(map); 
    directionsRenderer.setDirections(result); 
  } 
  render() {
    return (
      <main>
        <div id="right-panel">
        {/* <h>"here"</h> */}
        <ControlledExpansionPanels changeMap={this.handleChange2} attractionData = {this.attractions} getOverview = {this.handleChange3} showMarker = {this.handleChange4} showDescription={this.handleChange5}></ControlledExpansionPanels>
        </div>
        <div id="map"></div>
        
        <div id="down-panel"></div>
        <div className='tab'>
        {this.state.showDescription?

        <div id="down-panel-right">
        <h6 id="attraction-title">here is down panel right</h6>
        <p id="attraction-description">here is description</p>
        </div>
        :
        <div></div>
        }
        
        </div>
      </main>
    )
  }
}

function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}
function findArrayElementByTitle(array, title) {
    return array.find((element) => {
      return element.title === title;
    })
  }
function createMarkers(places,map) {
  var bounds = new window.google.maps.LatLngBounds();
  // var placesList = document.getElementById('places');

  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new window.google.maps.Size(71, 71),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(17, 34),
      scaledSize: new window.google.maps.Size(25, 25)
    };

    var marker = new window.google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });
    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}
export default Maps;