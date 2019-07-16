import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCardBody,
  MDBEdgeHeader, MDBFreeBird
} from "mdbreact";
import "./HomePage.css";

import {ReactComponent as Logo} from "../assets/logo.svg";

class FormsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      articleURL : 'http://en.wikipedia.org/wiki/Artist',
      data : '',
      statusCode : 0,
      error : ''
    }

    this.handleURLChange = this.handleURLChange.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  scrollToBottom(){
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  handleURLChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
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
        .then(res => res.json())
        .then(res => {
          console.log(res)})
        .then( ()=> this.setState({cont: 'afga'}))
        .catch((err) => {
        console.log(err)})

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
                          <MDBInput label="Wikipedia URL" background icon="link" onChange={this.handleURLChange} value={this.state.articleURL} name="articleURL" />
                          <MDBBtn onClick={this.handleSubmit} color="primary">Summarize</MDBBtn>
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
                          Data: {this.state.data ? this.state.data : 'No Data'} state : {this.state.articleURL} error : {this.state.error}
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

export default FormsPage;
