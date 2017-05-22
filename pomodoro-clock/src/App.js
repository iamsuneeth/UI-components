import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      session:{
        hrs:0,
        mints:25,
        secs:0
      },
      breakfor:{
        hrs:0,
        mints:5,
        sesc:0
      },
      interval:null,
      isPaused:false,
      currentTime:25*60
    }
    this.sessionSettings = 25;
    this.breakforSettings = 5;
  }
  startSession = () => {
    let hrs,mints,secs,stroke;
    let _interval = setInterval(() => {
      if(!this.state.isPaused){
        if(this.state.currentTime <= 0){
        clearInterval(_interval);
        return;
        }
        --this.state.currentTime;
        stroke = +((this.state.currentTime/this.state.sessionSettings).toFixed(2))*2*Math.PI*parseInt(document.getElementById('#bar').getAttribute('r'),10);
        document.getElementById('#bar').style.strokeDashoffset = stroke;
        hrs = parseInt(this.state.currentTime/3600,10);
        mints = parseInt((this.state.currentTime%3600)/60,10);
        secs = parseInt(this.state.currentTime%60,10);
        console.log(mints,':',secs)
        this.setState({
          session:{
            hrs:hrs,
            mints:mints,
            secs:secs
          }
        });     
       }
       },1000);
      this.setState({
        interval:_interval
      }); 

    }
  
  resetSession = () => {
    clearInterval(this.state.interval);
    this.setState({
      session:{
        hrs:0,
        mints:this.sessionSettings,
        secs:0
      },
      breakfor:{
        hrs:0,
        mints:this.breakforSettings,
        secs:0
      }
    })
  }
  pauseSession = () => {
    this.setState({
      isPaused:!this.state.isPaused
    })
  }
  alterSession = (value) => {
    this.sessionSettings += value;
    this.setState({
      session:{
        hrs:0,
        mints:this.sessionSettings,
        secs:0
      }
    });
    this.setState({
      currentTime: this.sessionSettings*60
    });
  }
  alterBreak = (value) => {
    this.breakforSettings += value;
    this.setState({
      breakfor:{
        hrs:0,
        mints:this.breakforSettings,
        secs:0
      }
    });
    
  }
  render() {
    
    return (
      <div className="App">
        <div className="App-header">
          <h2>POMODORO CLOCK</h2>
        </div>
        <div className="App-intro container">
          <div className="values row">
            <div className="col col-lg-offset-3 col-lg-6">
              <div className="row">
                <div className="col col-lg-6"><button className="btn counter" disabled={this.breakforSettings===0?true:false} onClick={this.alterBreak.bind(this,-1)}>-</button><span className="content">{this.breakforSettings}</span><button className="btn counter" onClick={this.alterBreak.bind(this,1)}>+</button></div>
                <div className="col col-lg-6"><button className="btn couter" disabled={this.sessionSettings===0||this.sessionSettings===50?true:false} onClick={this.alterSession.bind(this,-1)}>-</button><span className="content">{this.sessionSettings}</span><button className="btn counter" onClick={this.alterSession.bind(this,1)}>+</button></div>
              </div>
            </div>
          </div>
          <div className="clock row text-center">
            <div className="col col-lg-offset-3 col-lg-6">
              <div id="cont" data-ptt={(this.state.session.hrs===0?'':this.state.session.hrs+' : ')+this.state.session.mints +' : '+ this.state.session.secs+ (this.state.session.secs===0?this.state.session.secs:'')}>
              <svg id="svg" viewBox="0 0 400 400"  version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle r="180" cx="200" cy="200" fill="transparent" strokeDasharray="1130.96" strokeDashoffset="0"></circle>
                <circle id="bar" r="180" cx="200" cy="200" fill="transparent" strokeDasharray="1130.96" strokeDashoffset="0"></circle>
              </svg>
            </div>
            </div>
          </div>
          <div className="btn-group">
            <button className="btn btn-default" onClick={this.startSession}>Start</button>
            <button className="btn btn-default" onClick={this.pauseSession}>{this.state.isPaused?'Resume':'Pause'}</button>
            <button className="btn btn-default" onClick={this.resetSession}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
