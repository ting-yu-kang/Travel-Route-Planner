import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
  },
});

class ControlledExpansionPanels extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      expanded: null, 
      open: false,
      opens:{},
      curOpen:null
    }
    
    this.attractionData=this.props.attractionData;
    this.currentlat=this.props.currentlat;
    this.currentlng=this.props.currentlng;
    this.travelTime="";
    this.attractionNumber = "";
    // this.attractionData=tmpData
    // console.log(this.attractionData)
}
  // state = {
  //   expanded: null,
  // };
  componentWillMount() {
    this.calculateTime();
    this.calculateAttractions();
    this.calculateGroups();
  }
  calculateTime() {
    var time =0;
    for (var i = 0; i < this.attractionData.length; i++) {
      time += this.attractionData[i].travel_time.value;
    }
    // console.log(Math.ceil( time/60 ))
    this.travelTime = Math.ceil( time/60 ); 
    // return time/60;
  }
  calculateAttractions() {
    var number =0;
    for (var i = 0; i < this.attractionData.length; i++) {
      number += this.attractionData[i].attractions.length;
    }
    // console.log( number);
    this.attractionNumber = number; 
  }
  calculateGroups() {
    var arr ={};
    for (var i = 0; i < this.attractionData.length; i++) {
      var a = this.attractionData[i].index;
      // console.log(a)
      arr[a]=false;
      // arr.push({a:false});
    }
    this.setState(state => ({ opens: arr}));
  }
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
    // console.log(this.props.callApi)
    this.props.changeMap("asdasdf")
  };
  handleClick = (index) => {
    // console.log(this.state.opens);
    // console.log(index);
    // console.log(this.state.opens[1]);
    let newState = this.state;
    newState.opens[index]= !newState.opens[index];
    if(newState.opens[index]) {
      newState.curOpen=index;
    } else {
      newState.curOpen=-1;
    }
    this.props.callbackFromParent(newState.curOpen);
    this.setState({newState});
    console.log(newState.opens);
  };


  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    // console.log(attractionData)
    const stylesDefault = {
        background: 'white',
    }
    const stylesSelected = {
      background: 'grey',
  }
    
    const Test = ({attractionData}) => (
      <div>
{/* current location */}
        <ListItem button onClick={()=>this.props.showMarker(this.currentlat, this.currentlng,"Current Locataion")}>
          <ListItemIcon >
          <SvgIcon>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </SvgIcon>
          </ListItemIcon>
          <ListItemText  primary="Current Location" />
        </ListItem>

{/* current to first parking */}
        {/* <div className="tab"> */}
        <ListItem button>
           <ListItemIcon>
          <SvgIcon>
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>          </SvgIcon>
          </ListItemIcon>
            <ListItemText onClick={() => { 
              this.props.changeMap("asdasdf", this.currentlat, this.currentlng,
              attractionData[0].parking[0].coordinates.lat,attractionData[0].parking[0].coordinates.lng,'DRIVING')
              }}>
          Current Location to Group 1 ({attractionData[0].travel_time.text})</ListItemText> 
            </ListItem>
            {/* </div> */}


        {attractionData.map(a => (
          
          <div className={classes.root}  key={a.index}>
{/* show attraction groups */}
          <ListItem style={this.state.curOpen==a.index ?stylesSelected : stylesDefault} button onClick={()=>this.handleClick(a.index) }>
          <ListItemIcon >
          <SvgIcon>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </SvgIcon>
          </ListItemIcon>
          <ListItemText  primary={"Attractions Group "+a.index} />
          {this.state.opens[a.index] ? <ExpandLess /> : <ExpandMore />}
          {/* {this.state.open ? <ExpandLess /> : <ExpandMore />} */}
        </ListItem>
        <div className="tab" >
          <Collapse in={this.state.opens[a.index]} timeout="auto" unmountOnExit >
          <List component="div" disablePadding >

            {a.attractions.map(function(b){
            return   <div className={classes.root} key={b.id}>

{/* show visit marker */}
            <ListItem button className={classes.nested}>
             <ListItemIcon>
           <SvgIcon>
           <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>          </SvgIcon>
           </ListItemIcon>
               <ListItemText onClick={() => { 
               this.props.showMarker(b.coordinates.latitude, b.coordinates.longitude, b.name)
           }}> {b.name} 
          </ListItemText>
             </ListItem>
            <div className='tab'>
             </div>
             </div>
          },this)}

          </List>
        </Collapse>
        </div>

{/* show driving direction */}
        {a.index < attractionData.length ? 
           <ListItem button>
           <ListItemIcon>
          <SvgIcon>
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>          </SvgIcon>
          </ListItemIcon>
            <ListItemText onClick={() => { 
              this.props.changeMap("asdasdf", a.parking[0].coordinates.lat,a.parking[0].coordinates.lng,
              attractionData[a.index].parking[0].coordinates.lat,attractionData[a.index].parking[0].coordinates.lng,'DRIVING')
              }}>
           Attractions Group {a.index} to Attractions Group {attractionData[a.index].index} ({attractionData[a.index].travel_time.text})</ListItemText> 
            </ListItem>
            :
            <h6></h6>
            }
            {/* </div> */}
          </div>
          
        )
        ,this)}
        
      </div>
    ); 

    
    return (
      <div className={classes.root}>
        <div>
          <div className={classes.root} key="overview">
          <ListItem button onClick={() => { 
                this.props.getOverview();
            }}>
          <ListItemText  primary="OVERVIEW" secondary={"(total transit time between groups: "+this.travelTime+
          " mins, total atraction number: "+this.attractionNumber+") "} />
          </ListItem>
          </div>
          </div>
          <div className="container" >
        <div>
          <Test attractionData={this.attractionData} className="tab"/>
        </div>
        </div>


      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);