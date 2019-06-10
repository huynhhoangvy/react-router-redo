import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const data = require ("../src/data.json");
console.log(data)

const HomePage = () => {
  return (
    <div className="homePage">
      Homepage
    </div>
  )
}

class Candidates extends React.Component {
  constructor (props) {
    super (props)
    this.state={
      data : data,
    }
  }

  EditCandidate = (id) => {
    this.props.history.push(`candidates/edit/${id}`)
    console.log("thisthisthisthis", this.props.history)
  }

  RenderCandidates = () => {
    return (
      this.state.data.map(({first_name, last_name, id, avatar, gender}) => {
        return (
          <div key={id}>
            <img src={avatar} />
            <p>Full Name: {first_name + " " + last_name} <br />
            Gender: {gender}</p>
            <button onClick={() => this.RemoveCandidate(id)} >Remove Candidate</button>
            <button onClick={() => this.EditCandidate(id)} >Edit Candidate</button>
            <Link to={"/candidates/view/" + id} >Details...</Link>
            <hr />
          </div>
        )
      })
    )
  }

  RemoveCandidate = (id) => {
    const newData = this.state.data.filter (element => {
      return element.id !== id
    })

    this.setState ({data: newData})

    console.log ("newdatalength", newData.length)
  }

  render () {
    return (
      <div className="candidates">
        {this.RenderCandidates()}
      </div>
    )
  }
}

const NavBar = () => {
  return (
    <nav className="navBar">
      <ul style={{margin: "0px", listStyleType: "none"}}>
        <li><Link to="/" >Home</Link></li>
        
        
        <li><Link to="/candidates" >Candidates</Link></li>
      </ul>
    </nav>
  )
}

const EditCandidatePage = () => {
  return (
    <div className="eidtCandidatePage">
      Edit Candidate Page
    </div>
  )
}

class App extends React.Component {
  constructor (props) {
    super (props)
    this.state={
      id: 123,
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route path="/" exact component={HomePage} />
          <Route path="/candidates" exact component={Candidates} />
          <Route path="/candidates/edit/:id" exact component={() => <EditCandidatePage isAuthed={true} newId={this.state.id} />} />
        </div>
      </Router>
    );
  }
}

export default App;
