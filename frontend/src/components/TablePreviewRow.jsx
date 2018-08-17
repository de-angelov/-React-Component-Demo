import React, { Component } from 'react'
import moment from 'moment';

export default class EventPreview extends Component {
  constructor(props){
    super(props)
    this.state = {
      EventID: props.event.EventID,
      EventName: props.event.EventName,
      OddsForFirstTeam: props.event.OddsForFirstTeam,
      OddsForDraw: props.event.OddsForDraw,
      OddsForSecondTeam: props.event.OddsForSecondTeam,
      EventStartDate: props.event.EventStartDate,
      Index: props.index,
    }

    this.logOddInfo=this.logOddInfo.bind(this);
  }

  logOddInfo( name, value ){
    console.log(`${this.state.EventID} ${name} ${value}`)
  }

  render() {
  
  let color = this.state.Index%2===0 && this.state.inex!==0 ? 'AliceBlue' : 'HoneyDew' ;
  console.log(this.state.EventStartDate);
  color =  moment(this.state.EventStartDate,'DD-MM-YY HH-mm') > moment() ? color : 'LightSalmon';
  const backgroundColor = { backgroundColor: color }
  const staticRow = <div className='uiContainer' >
   <div className='eventName' style={ backgroundColor } >{this.state.EventName}</div>
   <div 
    className='oddsForFirstTeam' 
    style={ backgroundColor }  
    onClick={ () => this.logOddInfo( 'OddsForFirstTeam', this.state.OddsForFirstTeam )}>
    {this.state.OddsForFirstTeam}</div>
   <div 
    className='oddsForDraw' 
    style={ backgroundColor }
    onClick={ () => this.logOddInfo( 'OddsForDraw', this.state.OddsForDraw )}>{this.state.OddsForDraw}</div>
   <div 
   className='oddsForSecondTeam' 
   style={ backgroundColor }
   onClick={ ()=> this.logOddInfo( 'OddsForSecondTeam', this.state.OddsForSecondTeam )} >{this.state.OddsForSecondTeam}</div>
   <div className='eventStartDate' style={ backgroundColor } >{this.state.EventStartDate.toString()}</div>
  </div>
    return (staticRow);
  }
}



