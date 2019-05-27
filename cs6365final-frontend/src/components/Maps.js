import PostData from '../data/paths.json'
import attractionData from '../data/attractions.json'
import React, { Component } from 'react'
import '../App.css'
import MapDropdown from './MapDropdown'
import ControlledExpansionPanels from "./About";
import Home from "./Home"
import parking_icon from '../pics/parking_icon.png'

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
        showDescription:false,
        attractionList:null,
        parking:null
      }

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3=this.handleChange3.bind(this);
    this.handleChange4=this.handleChange4.bind(this);
    this.handleChange5=this.handleChange5.bind(this);
    this.myCallback=this.myCallback.bind(this);
    
    this.attractions = this.props.location.state.form;
    this.currentlat = this.props.location.state.lat;
    this.currentlng = this.props.location.state.lng;
    // this.attractionList = "";
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
    for(var i=0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
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
    for(var i=0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
    this.setState(oldState => ({ showDescription: false }));
    this.calculateAndDisplayRoute2(this.directionsService, this.directionsDisplay,this.map,this.renderDirections); 
  }

  // visit attraction change
  handleChange4(lat, lng, title) {
    for(var i=0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
    // console.log(title)  
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
    // var ti = document.getElementById("attraction-title")
    // var de = document.getElementById("attraction-description")
    // de.set  
  }



  calculateAndDisplayRoute(directionsService, directionsDisplay,map,renderDirections) {
    directionsService.route({
      origin: new window.google.maps.LatLng(this.startlat, this.startlng),
      destination: new window.google.maps.LatLng(this.endlat, this.endlng),
      travelMode: this.travelMode
   }, function(response, status) {
    //  console.log(response)
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
  
  //  console.log(this.attractions[this.attractions.length-1].attraction)
  //  var start = this.attractions[0].parking[0].coordinates;
   var end = this.attractions[this.attractions.length-1].parking[0].coordinates;
   var waypts = [];
        for (var i = 0; i < this.attractions.length-1; i++) {
          var wp = this.attractions[i].parking[0].coordinates;
            waypts.push({
              location: new window.google.maps.LatLng(wp.lat, wp.lng),
              stopover: true
            });
        }
        // directionsDisplay.setPanel(null);

    this.directionsService.route({
      // origin: new window.google.maps.LatLng(start.lat, start.lng),
      origin: new window.google.maps.LatLng(this.currentlat, this.currentlng),
      destination: new window.google.maps.LatLng(end.lat, end.lng),
      waypoints: waypts,
      travelMode: this.travelMode
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setMap(map)
      directionsDisplay.setPanel(document.getElementById('down-panel'));
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
  myCallback = (index) => {
    if(index>0) {
    
    var attractionL = this.attractions[index-1].attractions;
    
    var parking = this.attractions[index-1].parking[0].coordinates;
    this.renderMarkers(attractionL, parking);
    // console.log(parking)
    var parkCo = {latitude:parking.lat, longitude:parking.lng};
    var park ={coordinates:parkCo,id:this.attractions[index-1].parking[0].id,name:"Parking"}
    var dash ={coordinates:null,id:'1',name:"------------------------"}
    var attL =[]
    attL.unshift(park,dash)
    for (var i =0; i < attractionL.length; i++) {
    attL.push(attractionL[i])
  }
    console.log(park)
    console.log(attL)

    this.setState(
      prevState => ({
          ...prevState,
          attractionList: attL,
          parking:parking
        
      }),
      () => console.log(this.state.attractionList)
    );
  } else {
    this.setState(
      prevState => ({
          ...prevState,
          attractionList: null,
          parking:null
        
      }),
      () => console.log(this.state.attractionList)
    );
  }

}

renderMarkers=(attractionL, parking)=> {
  for(var i=0; i < this.markers.length; i++) {
    this.markers[i].setMap(null);
  } 
  this.markers = [];
  
for(var i = 0; i < attractionL.length; i++) {
  var lat = attractionL[i].coordinates.latitude;
  var lng = attractionL[i].coordinates.longitude;
  var title = attractionL[i].name;
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
  // marker.addListener('click', function() {
  //   infowindow.open(this.map, marker);
  // });
  
  this.markers.push(marker);
  // this.markers[0]=marker;
}
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var parkIcon = iconBase+'parking_lot_maps.png';
  var parkMarker = new window.google.maps.Marker({
    position: {lat: parking.lat, lng: parking.lng},
    map: this.map,
    title: "Parking",
    icon : parking_icon
  });
  this.map.setCenter({lat:parking.lat, lng:parking.lng});
  this.markers.push(parkMarker);
  this.directionsDisplay.setPanel(null);
  this.directionsDisplay.setMap(null);
}

  render() {
    return (
      <main>
        <div id="right-panel">
        {/* <h>"here"</h> */}
        <ControlledExpansionPanels changeMap={this.handleChange2} attractionData = {this.attractions} getOverview = {this.handleChange3} 
        showMarker = {this.handleChange4} showDescription={this.handleChange5}
        currentlat={this.currentlat} currentlng={this.currentlng}
        callbackFromParent={this.myCallback}></ControlledExpansionPanels>
        
        </div>
        
        <div id="map">
        
        </div>
        
        <div id="down-panel"></div>
{this.state.attractionList? 
        <div id="down-panel-right">        
        <MapDropdown attractionList = {this.state.attractionList}  changeMap={this.handleChange2}></MapDropdown>
        </div>
  : <div></div>}      
        
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

    // var li = document.createElement('li');
    // li.textContent = place.name;
    // placesList.appendChild(li);

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}
export default Maps;