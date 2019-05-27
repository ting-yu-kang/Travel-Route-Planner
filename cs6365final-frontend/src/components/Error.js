import React, { Component } from 'react'
class Error extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.history.location.state.errorMessage)
  }
  render()  {
    // const Error = () => {
    //   return (
    //     <div>
    //       <p>Error! {this.props.state.errorMessage}</p>
    //     </div>
    //   );
    // };
    return <div>
    <p>{this.props.history.location.state.errorMessage}</p>
  </div>
  }
}


export default Error;