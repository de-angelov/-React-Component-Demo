import React, { Component } from 'react'
import uuidV4  from 'uuid/v4';
import axios from 'axios'
import moment from 'moment'
import TableEditRow from './TableEditRow';
import TablePreviewRow from './TablePreviewRow';

export default class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: [],
      isPreview: false,
    }
    this.postServerEventData = this.postServerEventData.bind(this);
    this.getServerEventData = this.getServerEventData.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
    this.addNewEvent = this.addNewEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  componentDidMount(){
    this.getServerEventData();
  }

  getServerEventData(){
    axios.get('http://localhost:4000/').then( (res)=>{
        const eventData = Object.values(res.data);
        this.setState({ eventData });
      }
    )
  }

  postServerEventData(){ 
    const body = {
      eventData: Object.assign({}, this.state.eventData),
    }
    axios.post('http://localhost:4000/', body).then((res) => {})
    }

  componentDidUpdate() {
    this.postServerEventData();
  }

  togglePreview() {
    const isPreview = !this.state.isPreview;
    this.setState({ isPreview });
  }

  addNewEvent() {
    const id = uuidV4();
    const date = moment().format('DD-MM-YYYY');
    const time = "23:59";
    
    const newEvent = {
      EventName: 'add name',
      OddsForFirstTeam: 0.00,
      OddsForDraw: 0.00,
      OddsForSecondTeam: 0.00,
      EventStartDate: date+' '+time,
      EventID: id,
    };
    const eventData = [...this.state.eventData, newEvent];
    this.setState({ eventData });
  }

deleteEvent(toBeDeletedEvent) {
  const eventData = this.state.eventData
    .filter((event) => event.EventID !== toBeDeletedEvent.EventID);
  this.setState({ eventData });
}

updateEvent(toBeUpdatedEvent) {
  const eventData = this.state.eventData
    .map((event) => event.EventID === toBeUpdatedEvent.EventID ? toBeUpdatedEvent : event)
  this.setState({ eventData });
}

  getPreview(){
    const events = this.state.eventData.map((event, i) => (<TablePreviewRow
        event = {event}
        key = {event.EventID}
        index = {i}
        backgroundColor = { i%2===0 && i!==0 ? 'LightSalmon' : 'HoneyDew'  }  />));
    const result = (<div>
      <div className = 'uiContainer'>
      <button className = 'rightButton' onClick={this.togglePreview}> Edit Mode </button>
      </div>
      <div>{events}</div>
    </div>);
    return result;
  }
  
  getEdit(){
    const events = this.state.eventData.map((event) => {
      return (
        <TableEditRow
          key={event.EventID}
          event={event}
          deleteEvent={this.deleteEvent}
          updateEvent={this.updateEvent}
        />
      )
     });

    const result = (<div>
      <div className='uiContainer'>
      <button className = 'rightButton' onClick={this.togglePreview}>Preview Mode</button>
      </div>
      {events}
      <div className='uiContainer'>
      <button className = 'leftButton' onClick={this.addNewEvent}>Add</button>
      </div>
    </div>);
    return result;
  }

  render() {
  return this.state.isPreview ? this.getPreview() : this.getEdit(); 
  }
}


 