import React from "react";
import {
  MDBEdgeHeader,
  MDBFreeBird,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody, MDBInput, MDBBtn
} from "mdbreact";
import "./HomePage.css";

import {ReactComponent as Logo} from "../assets/logo.svg";

class HomePage extends React.Component {
  state = {
    articleURL : 'http://en.wikipedia.org/wiki/Artist',
    cont : '',
    statusCode : 0
  }

  constructor(props){
    super(props);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  scrollToBottom(){
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  handleURLChange = (e) => {
    e.preventDefault();
    this.setState({articleURL: e.target.articleURL});
  }

  handleSubmit(event){
    //const urlFull= 'https://en.wikipedia.org/wiki/'+this.state.url;
    event.preventDefault();
    fetch('http://localhost:8008/',

        {
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: 'link=https://en.wikipedia.org/wiki/love',
          mode: 'no-cors'
        })
        //.then(res => res.json())
        .then(res => console.log(res))
        .then( ()=> this.setState({cont: 'afga'}))
        .then(() => this.scrollToBottom())
        .catch(err => console.log(err))

    //http://35.238.223.8:8001/wiki
  };


  render() {
    return (
      <div ref={(el) => { this.messagesEnd = el; }}>
        <MDBEdgeHeader color="indigo darken-3" />
        <MDBFreeBird>
          <MDBRow>
            <MDBCol
              md="10"
              className="mx-auto float-none white z-depth-1 py-2 px-2"
            >
              <MDBCardBody>
                <h2 className="h2-responsive mb-4">
                  <Logo style={{ height: "2.5rem", width: "2.5rem" }} /><strong>WikiBot API</strong>
                </h2>
                <p>Explore thousands of summarized Wikipedia articles for free!</p>
                <MDBRow>
                  <MDBCol tag="section">
                    <MDBContainer className="border p-3 custom-input-group">
                      <form>
                        <MDBInput label="Wikipedia URL" background icon="link" onChange={this.handleURLChange} value={this.state.articleURL} name="articleURL" />
                        <MDBBtn type="submit" onClick={this.handleSubmit} color="primary">Summarize</MDBBtn>
                      </form>
                    </MDBContainer>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol
                md="10"
                className="mx-auto float-none white z-depth-1 py-2 px-2"
            >
              <MDBCardBody>
                <MDBRow>
                  <MDBCol tag="section">
                    <MDBContainer className="border p-3 custom-input-group">
                      Data: {this.state.cont} state : {this.state.articleURL}
                    </MDBContainer>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBFreeBird>
      </div>
    );
  }
}

export default HomePage;
