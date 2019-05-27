
import PostData from '../data/destinations.json'
import React, { Component } from 'react'

class MapDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attractions: null,
            start: 1,
            end:1,
            startLoc:null,
            endLoc:null,
          }
    
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.list = this.props.attractionList;
        // this.handleSubmit = this.handleSubmit.bind(this);
      }
    
   
    componentDidMount() {
      // console.log(this.props);
        // this.setState({
        //     attractions: PostData,
        //     selectedattraction: PostData[0].name
        //   })
        
    }
    handleChangeStart(e) {
        let value = e.target.value;
        // console.log(value)
        this.setState({start: value});
        var list = this.props.attractionList;
        for (var i = 0; i < list.length; i++) {
          if(list[i].id===value) {
            this.setState({startLoc:list[i].coordinates})
            console.log(list[i]);
            if(this.state.endLoc&&list[i].coordinates) {
              this.props.changeMap("asdasdf", list[i].coordinates.latitude, list[i].coordinates.longitude,
              this.state.endLoc.latitude, this.state.endLoc.longitude,'WALKING')
            }
            break;
          }
        }
        
        
      }
      handleChangeEnd(e) {
        let value = e.target.value;
        // console.log(value)
        this.setState({end: value});
        var list = this.props.attractionList;
        for (var i = 0; i < list.length; i++) {
          if(list[i].id===value) {
            this.setState({endLoc:list[i].coordinates})
            if(this.state.startLoc &&list[i].coordinates) {
              this.props.changeMap("asdasdf", this.state.startLoc.latitude, this.state.startLoc.longitude,
              list[i].coordinates.latitude, list[i].coordinates.longitude,'WALKING')
            }
            console.log(list[i]);
            break;
          }
        }
        
        // this.props.changeMap("asdasdf", this.currentlat, this.currentlng,
        //       attractionData[0].parking[0].coordinates.lat,attractionData[0].parking[0].coordinates.lng,'DRIVING')
      }
    render() {
  
      return (
        <div>
        {this.props.attractionList?
        <div>
           <div id="floating-panel1">
           <b>Start (A): </b>
          <select value={this.state.start} 
                //   onChange={(e) => this.setState({selectedattraction: e.target.id})}>
                onChange={(e) => this.handleChangeStart(e)}>            
            {this.props.attractionList.map((attraction) => <option key={Math.random()} value = {attraction.id}>{attraction.name}</option>)}
          </select>
          </div>
          <div id="floating-panel2">
          <b>End (B): </b>
          <select value={this.state.end} 
                //   onChange={(e) => this.setState({selectedattraction: e.target.id})}>
                onChange={(e) => this.handleChangeEnd(e)}>            
            {this.props.attractionList.map((attraction) => <option key={Math.random()} value = {attraction.id}>{attraction.name}</option>)}
          </select>
          </div>
        </div>

        
        : <div></div>}
        </div>
      )
    }
  }
  export default MapDropdown