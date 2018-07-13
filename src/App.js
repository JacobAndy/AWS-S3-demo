import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    audios: []
  };
  componentDidMount() {
    axios
      .get("http://localhost:3001/messages")
      .then(res => {
        // console.log(res);
        this.setState({ audios: res.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    let { audios } = this.state;
    console.log(audios);
    let mappedAudios = audios[0]
    {/* The value in the mapping is the url for the audios over s3 */}
      ? audios.map((val, i) => <audio controls key={i} src={val} />)
      : null;
    return <div>{mappedAudios}</div>;
  }
}

export default App;
