import React, { Component } from 'react';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';

export default class TableEditRow extends Component {
  constructor(props){
    super(props);
    this.state = {
      EventID: props.event.EventID,
      EventName: props.event.EventName,
      OddsForFirstTeam: props.event.OddsForFirstTeam,
      OddsForDraw: props.event.OddsForDraw,
      OddsForSecondTeam: props.event.OddsForSecondTeam,
      EventStartDate: props.event.EventStartDate
    }

    this.updateDateTimeValue = this.updateDateTimeValue.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }
  
  updateEvent(){
    const toBeUpdatedEvent = {
      EventID: this.state.EventID,
      EventName: this.state.EventName,
      OddsForFirstTeam: this.state.OddsForFirstTeam,
      OddsForDraw: this.state.OddsForDraw,
      OddsForSecondTeam: this.state.OddsForSecondTeam,
      EventStartDate: this.state.EventStartDate,
    }
    this.props.updateEvent(toBeUpdatedEvent)
  }

  deleteEvent(){
    const toBeDeletedEvent = {
      EventID: this.state.EventID,
      EventName: this.state.EventName,
      OddsForFirstTeam: this.state.OddsForFirstTeam,
      OddsForDraw: this.state.OddsForDraw,
      OddsForSecondTeam: this.state.OddsForSecondTeam,
      EventStartDate: this.state.EventStartDate,
    }
    this.props.deleteEvent(toBeDeletedEvent)
  }

  updateDateTimeValue(date){
     const EventStartDate = moment(date).format('DD-MM-YYYY HH-mm');
     this.setState({ EventStartDate });
  }

  updateValue(event){
    if( event.target.name==='EventStartDate' ){
      const formatedDate = moment(event.target.value,'YYYY-MM-DD HH-mm').format('DD-MM-YYYY HH-mm');
      this.setState({ [event.target.name]: formatedDate});
    }else{
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  render() {
   const txt = this.state.EventStartDate;
   let momentDate = moment(txt,'DD-MM-YYYY HH-mm');
  const formatedDate = moment(txt,'DD-MM-YYYY HH-mm').format('YYYY/MM/DD HH:mm:ss');
  const date = new Date(formatedDate);
   const form = <form className='uiContainer' ref={this.state.EventID}>
    <div className='eventID'>
    <input 
        ref='EventID'
        name='EventID'
        type='text'
        value={this.state.EventID}
        onChange = {this.updateValue}
        />
    </div>
    <div className='eventName'>
    <input 
        ref='EventName'
        name='EventName'
        type='text'
        value={this.state.EventName}
        onChange = {this.updateValue}
        />
    </div>
    <div className='oddsForFirstTeam'>
      <input 
        ref='OddsForFirstTeam'
        name='OddsForFirstTeam'
        type='number'
        step='0.01'
        min='0'
        value={this.state.OddsForFirstTeam}
        onChange = {this.updateValue}
        />
    </div>
    <div className='oddsForDraw'>
      <input 
        ref='OddsForDraw'
        name='OddsForDraw'
        type='number'
        step='0.01'
        min='0'
        value={this.state.OddsForDraw}
        onChange = {this.updateValue}
        />
    </div>
    <div className='oddsForSecondTeam'>
      <input 
        ref='OddsForSecondTeam'
        name='OddsForSecondTeam'
        type='number'
        step='0.01'
        min='0'
        value={this.state.OddsForSecondTeam}
        onChange = {this.updateValue}
        />
    </div>
    <DateTimePicker
    className='eventStartDatePick'
      className='input'
      value = {date}
      onChange = {this.updateDateTimeValue}
      />

    <div ref={`${this.state.EventID}-`} className='controls'>
        <button type='button' onClick={this.updateEvent}>Save</button>
        <button type='button' onClick={this.deleteEvent}>Delete</button>
    </div> 
  </form>

    return (form)
  }
}
