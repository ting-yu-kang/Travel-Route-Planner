import React, { Component } from "react";
import CheckBox from "../components/CheckBox";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Select from "../components/Select";
import Select2 from "../components/Select2";
import Button from "../components/Button";
import  MultiSelectReact  from 'multi-select-react';
import MapDropdown from "./MapDropdown";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        price: "",
        transportation:"",
        foodType:"",
        duration:"",
        // attraction:"",
        attraction1:"",
        attraction2:"",
        attraction3:"",
        numberofgroups:"",
        attractions2:""
      },
      curLocation: {
        lat: 37.4224764,
        lng: -122.0842499
      },
      isLoading: false,
      initialD : null,
      initialD2: null,
      priceOptions: ["$", "$$", "$$$"],
      durationOptions:[1,2,3,4,5,6,7,8,9],
      transportations: ["Drive","Public Transportation","Walk"],
      attractionOptions:["Museum and gallery", "Outdoor", "Historical"],
      numberofgroupss:[1,2,3,4,5],
      foodOptions:["Afghan","African","Senegalese","South African","American","Arabian","Argentine","Armenian","Asian Fusion","Australian","Austrian","Bangladeshi","Barbeque","Basque","Belgian","Brasseries","Brazilian","Breakfast & Brunch","Pancakes","British","Buffets","Bulgarian","Burgers","Burmese","Cafes","Themed Cafes","Cafeteria","Cajun/Creole","Cambodian","Caribbean","Dominican","Haitian","Puerto Rican","Trinidadian","Catalan","Cheesesteaks","Chicken Shop","Chicken Wings","Chinese","Cantonese","Dim Sum","Hainan","Shanghainese","Szechuan","Comfort Food","Creperies","Cuban","Czech","Delis","Diners","Dinner Theater","Eritrean","Ethiopian","Fast Food","Filipino","Fish & Chips","Fondue","Food Court","Food Stands","French","Mauritius","Reunion","Game Meat","Gastropubs","Georgian","German","Gluten-Free","Greek","Guamanian","Halal","Hawaiian","Himalayan/Nepalese","Honduran","Hong Kong Style Cafe","Hot Dogs","Hot Pot","Hungarian","Iberian","Indian","Indonesian","Irish","Italian","Calabrian","Sardinian","Sicilian","Tuscan","Japanese","Conveyor Belt Sushi","Izakaya","Japanese Curry","Ramen","Teppanyaki","Kebab","Korean","Kosher","Laotian","Latin American","Colombian","Salvadoran","Venezuelan","Live/Raw Food","Malaysian","Mediterranean","Falafel","Mexican","Tacos","Middle Eastern","Egyptian","Lebanese","Modern European","Mongolian","Moroccan","New Mexican Cuisine","Nicaraguan","Noodles","Pakistani","Pan Asian","Persian/Iranian","Peruvian","Pizza","Polish","Polynesian","Pop-Up Restaurants","Portuguese","Poutineries","Russian","Salad","Sandwiches","Scandinavian","Scottish","Seafood","Singaporean","Slovakian","Somali","Soul Food","Soup","Southern","Spanish","Sri Lankan","Steakhouses","Supper Clubs","Sushi Bars","Syrian","Taiwanese","Tapas Bars","Tapas/Small Plates","Tex-Mex","Thai","Turkish","Ukrainian","Uzbek","Vegan","Vegetarian","Vietnamese","Waffles","Wraps"],
      // foodOptionsActual:["afghani","african","senegalese","southafrican","New","Traditional","arabian","argentine","armenian","asianfusion","australian","austrian","bangladeshi","bbq","basque","belgian","brasseries","brazilian","breakfast_brunch","pancakes","british","buffets","bulgarian","burgers","burmese","cafes","themedcafes","cafeteria","cajun","cambodian","caribbean","dominican","haitian","puertorican","trinidadian","catalan","cheesesteaks","chickenshop","chicken_wings","chinese","cantonese","dimsum","hainan","shanghainese","szechuan","comfortfood","creperies","cuban","czech","delis","diners","dinnertheater","eritrean","ethiopian","hotdogs","filipino","fishnchips","fondue","food_court","foodstands","french","mauritius","reunion","gamemeat","gastropubs","georgian","german","gluten_free","greek","guamanian","halal","hawaiian","himalayan","honduran","hkcafe","hotdog","hotpot","hungarian","iberian","indpak","indonesian","irish","italian","calabrian","sardinian","sicilian","tuscan","japanese","conveyorsushi","izakaya","japacurry","ramen","teppanyaki","kebab","korean","kosher","laotian","latin","colombian","salvadoran","venezuelan","raw_food","malaysian","mediterranean","falafel","mexican","tacos","mideastern","egyptian","lebanese","modern_european","mongolian","moroccan","newmexican","nicaraguan","noodles","pakistani","panasian","persian","peruvian","pizza","polish","polynesian","popuprestaurants","portuguese","poutineries","russian","salad","sandwiches","scandinavian","scottish","seafood","singaporean","slovakian","somali","soulfood","soup","southern","spanish","srilankan","steak","supperclubs","sushi","syrian","taiwanese","tapas","tapasmallplates","tex-mex","thai","turkish","ukrainian","uzbek","vegan","vegetarian","vietnamese","waffles","wraps"]

    };
    this.handlePrice = this.handlePrice.bind(this);
    this.handleDuration = this.handleDuration.bind(this);
    this.handleFoodtype = this.handleFoodtype.bind(this);
    this.handleFormSubmit1 = this.handleFormSubmit1.bind(this);
    this.handleFormSubmit2 = this.handleFormSubmit2.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleTransportation = this.handleTransportation.bind(this);
    this.handleAttraction1 = this.handleAttraction1.bind(this);
    this.handleAttraction2 = this.handleAttraction2.bind(this);
    this.handleAttraction3 = this.handleAttraction3.bind(this);
    this.handleAttractionN = this.handleAttractionN.bind(this);
  }

  handleDuration(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          duration: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }
  handlePrice(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          price: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }
  handleFoodtype(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          foodType: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }
  handleTransportation(e) {
    // console.log(e.target.value)
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          transportation: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }
  handleAttraction1(e) {
    // console.log(e.target.value)
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          attraction1: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }
  handleAttraction2(e) {
    // console.log(e.target.value)
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          attraction2: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }
  handleAttraction3(e) {
    // console.log(e.target.value)
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          attraction3: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }
  handleAttractionN(e) {
    // console.log(e.target.value)
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          numberofgroups: value
        }
      }),
      () => console.log(this.state.newUser)
    );
    
  }

  handleLocation(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          location: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }


  handleCheckBox(e) {
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.newUser.attractions2.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newUser.attractions2.filter(
        s => s !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.newUser.attractions2, newSelection];
    }
    

    this.setState(prevState => ({
      newUser: { ...prevState.newUser, attractions2: newSelectionArray }
    }));
    // console.log(this.state.newUser.attractions2)
  }

  handleFormSubmit1(e) {
    e.preventDefault();
    let userData = this.state.newUser;
    userData = {
      "lat": this.state.initialD.cur_location.lat,
      "lng": this.state.initialD.cur_location.lng,
      "distance": 0.5,
      "categories":"arts,active"
    }
      
    userData = Object.assign(this.state.newUser,userData);
    this.setState({ isLoading: true });
    fetch("https://cs6365final-backend.herokuapp.com/travel-assistant/test", {
      
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      // console.log(response)
      response.json().then(data => {
        this.setState({ isLoading: false });
        // console.log("Successful" + data);
        console.log( data);
        if(data==="cannot find any attraction group!") {
          this.props.history.push({ //browserHistory.push should also work here
            pathname: '/Error',
            state: {errorMessage: data,
            }
          });
        }
        else {
        this.props.history.push({ //browserHistory.push should also work here
          pathname: '/Maps',
          state: {form: data,
            lat:userData.lat,
            lng:userData.lng
          }
        }); 
      }

      });
    });  
    // this.props.history.replace('/Maps');
  }

  handleFormSubmit2(e) {
    e.preventDefault();
    let userData = this.state.newUser;
    userData = {
      "lat": this.state.initialD.cur_location.lat,
      "lng": this.state.initialD.cur_location.lng,
    }
  userData = Object.assign({attraction_ids:this.state.newUser.attractions2},userData);
  console.log(userData)
    this.setState({ isLoading: true });
    fetch("https://cs6365final-backend.herokuapp.com/travel-assistant/test2", {
      
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      // console.log(response)
      response.json().then(data => {
        this.setState({ isLoading: false });
        // console.log("Successful" + data);
        console.log( data);
        this.props.history.push({ //browserHistory.push should also work here
          pathname: '/Maps',
          state: {form: data,
            lat:userData.lat,
            lng:userData.lng
          }
        }); 
      });
    });  
    // this.props.history.replace('/Maps');
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newUser: {
        price: "",
        transportation:"",
        foodType:"",
        duration:"",
        // attraction:"",
        attraction1:"",
        attraction2:"",
        attraction3:"",
        numberofgroups:""
      }
    });
  }
  componentWillMount() {
    this.renderMyData1();
    // this.renderMyData2();
  }


renderMyData1() {
  this.setState({ isLoading: true });
  fetch("https://cs6365final-backend.herokuapp.com/travel-assistant/preprocess", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log(data)
        // this.setState({initialD:initialData});
        this.setState({initialD:data});
        this.setState({ isLoading: false });
      });
    });
}
renderMyData2() {
  this.setState({ isLoading: true });
  fetch("https://cs6365final-backend.herokuapp.com/travel-assistant/preprocess", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        this.setState({initialD2:data});
        console.log(data);
        this.setState({ isLoading: false });
      });
    });
}

  render() {
    // console.log(this.state)
      const selectedOptionsStyles = {
        color: "#3c763d",
        backgroundColor: "#dff0d8"
    };
    const optionsListStyles = {
        backgroundColor: "#fcf8e3",
        color: "#8a6d3b"
    };

    return (
      
      <div className="container">{this.state.initialD && !this.state.isLoading?
        <div>
          <h1>Auto Attraction Search</h1>
        <form className="container-fluid" onSubmit={this.handleFormSubmit1}>
     <Select2
      title={"Attraction Type 1"}
      name={"attraction1"}
      options={this.state.initialD.part1_category_list} 
      value={this.state.newUser.attraction1}
      placeholder={"Select Attraction Type"}
      handleChange={this.handleAttraction1}
     />
     <Select2
      title={"Attraction Type 2"}
      name={"attraction2"}
      options={this.state.initialD.part1_category_list} 
      value={this.state.newUser.attraction2}
      placeholder={"Select Attraction Type"}
      handleChange={this.handleAttraction2}
     />
     <Select2
      title={"Attraction Type 3"}
      name={"attraction3"}
      options={this.state.initialD.part1_category_list} 
      value={this.state.newUser.attraction3}
      placeholder={"Select Attraction Type"}
      handleChange={this.handleAttraction3}
     />

     <Select
      title={"Parking Number"}
      name={"attractionN"}
      options={this.state.numberofgroupss} 
      value={this.state.newUser.numberofgroups}
      placeholder={"Select number of parkings"}
      handleChange={this.handleAttractionN}
     />

    <Button
      action={this.handleFormSubmit1}
      type={"primary"}
      title={"Submit"}
      style={buttonStyle}
    />
    {/*Submit */}
    <Button
      action={this.handleClearForm}
      type={"secondary"}
      title={"Clear"}
      style={buttonStyle}
    />{" "}
    {/* Clear the form */}
    </form>
    <h1>Specified Attraction Search</h1>
    <form className="container-fluid" onSubmit={this.handleFormSubmit2}>
    
    <CheckBox
          title={"Famous Attractions"}
          name={"attractions"}
          options={this.state.initialD.part2_attraction_list}
          selectedOptions={this.state.newUser.attractions2}
          handleChange={this.handleCheckBox}
    />
    <Button
      action={this.handleFormSubmit2}
      type={"primary"}
      title={"Submit"}
      style={buttonStyle}
    />
    </form>
    </div>
      :
    <div><h1>Loading...</h1></div>}
     </div>
      
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default Home;