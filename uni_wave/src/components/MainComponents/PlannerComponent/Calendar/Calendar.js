import React, { useState } from "react";
import "./Calendar.css";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "../../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";

import DatePicker from "react-datepicker";
import "../../../../../node_modules/react-datepicker/dist/react-datepicker.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import AlertWarning from '../../../Alerts/AlertWarningCalendar.js';

const locales = {
  "en-UK": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function StudentCalendar(props) {
  // Add event popup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Update/Delete event popup
  const [showUpdateDelete, setUpdateDelete] = useState(false);
  const handleCloseUpdateDelete = () => setUpdateDelete(false);
  //selected event state
  const [pEvent, setEvent] = useState(null);
  //if the user wants to delete an event state button
  const [deleteEvent, setDeleteEvent] = useState(false);
  //if the user wants to update an event state button
  const [updateEvent, setUpdateEvent] = useState(false);
  //get the last event title and dates from user input
  const [titleEvent, setTitleEvent] = useState("");
  const [startDateEvent, setStartDateEvent] = useState("");
  const [endDateEvent, setEndDateEvent] = useState("");

  //warning alert popup
  const [warningVisible, setWarningVisible] = useState(false);

  //create a new event
  const [newEvent, setNewEvent] = useState({
    title: "",
    allDay: false,
    start: "",
    end: "",
  });
  const events = [];
  //store the state of all the events
  const [allEvents, setAllEvents] = useState(events);

  //adding the events to the calendar
  function handleAddEvent() {
    if (newEvent.start < newEvent.end) {
      setWarningVisible(false);
      setAllEvents([...allEvents, newEvent]);
      handleClose();
    } else {
      setWarningVisible(true);
    }
  }

  //when an event is selected
  function onSelectEvent(event) {
    //set the event clicked
    setEvent(event);
    //if the delete button is pressed, then delete the event
    if (deleteEvent === true) {
      deleteSelectedEvent();
    }
    if (updateEvent === true) {
      updateSelectedEvent();
    }
  }

  //delete the event selected
  function deleteSelectedEvent() {
    //the delete action just happened, so the state will return to false
    setDeleteEvent(false);

    //confirmation window for deleting an event
    const r = window.confirm("Would you like to remove this event?");

    if (r === true) {
      //remove one or more objects from state array
      allEvents.findIndex((obj) => {
        if (obj === pEvent) {
          setAllEvents(allEvents.filter((el) => el !== pEvent));
        }
      });
      handleCloseUpdateDelete();
    }
  }

  //update the event selected
  function updateSelectedEvent() {
    if (startDateEvent < endDateEvent) {
      setWarningVisible(false);
      //confirmation window for updating an event
      const r = window.confirm("Would you like to update this event?");

      if (r === true) {
        //the update action just happened, so the state will return to false
        setUpdateEvent(false);
        allEvents.findIndex((obj) => {
          if (obj === pEvent && titleEvent !== "" && startDateEvent !== "" && endDateEvent !== "") {
            obj.title = titleEvent;
            obj.start = startDateEvent;
            obj.end = endDateEvent;
          } else {
            if (obj === pEvent && titleEvent === "") {
              obj.start = startDateEvent;
              obj.end = endDateEvent;
            }
          }
        });
        handleCloseUpdateDelete();
      }
    } else {
      setWarningVisible(true);
    }
  }

  return (
    <>
      {/* Change Backgroung Color of the Page */}
      {props.pageColor ? (
        <style>
          {
            ".calendar { background-color: #0410574f !important; } .rbc-toolbar {color: white !important;} .rbc-toolbar button {color: #5f43dd !important;} .rbc-row { color: #ffffff !important;} .rbc-month-view {color: white !important;} .rbc-month-row {color: white !important;} .rbc-agenda-view {color: white !important;} .rbc-day-slot .rbc-event-content {color: white !important;} .rbc-time-view { color: white !important;}"
          }
        </style>
      ) : (
        <>
          <style>{"body { background-color: #5e73eb5 !important;}"}</style>
        </>
      )}
      <div className="calendar">
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", width: "100%" }}
          onSelectEvent={(event) => {
            onSelectEvent(event);
            //when an event selected, a popup will appear
            if (showUpdateDelete === false) setUpdateDelete(true);
          }}
        />

        <Button
          className="buttonAddEvent"
          variant="primary"
          onClick={handleShow}
        >
          Add Event
        </Button>

        {/* Add A New Event Window */}
        <Modal className="add-event-calendar" show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title className="addEventHead">Add A New Event</Modal.Title>
          </Modal.Header>
          <Modal.Body className="event-content-add">
            <input
              className="name-of-event"
              type="text"
              placeholder="Add Title"
              style={{ width: "20%", marginRight: "10px" }}
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <DatePicker
              className="pick-start-date"
              placeholderText="Start Date"
              style={{ marginRight: "10px" }}
              selected={newEvent.start}
              value={newEvent.start}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={(start) => setNewEvent({ ...newEvent, start })}
            />
            <DatePicker
              className="pick-end-date"
              placeholderText="End Date"
              selected={newEvent.end}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={(end) => setNewEvent({ ...newEvent, end })}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="close-event"
              variant="secondary"
              onClick={() => {handleClose(); setWarningVisible(false);}}
            />
            <Button
              className="save-event"
              variant="primary"
              onClick={handleAddEvent}
            >
              Save Event
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Update & Delete Window */}
        <Modal
          className="update-delete-event-calendar"
          show={showUpdateDelete}
          onHide={handleCloseUpdateDelete}
        >
          <Modal.Header>
            <Modal.Title className="updateDeleteEventHead">
              Update Or Delete An Event
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="event-content-add">
            <input
              className="name-of-event"
              type="text"
              placeholder="Add Title"
              style={{ width: "20%", marginRight: "10px" }}
              value={newEvent.title}
              onChange={(e) => {
                setNewEvent({ ...newEvent, title: e.target.value });
                //update the title state with the last input
                setTitleEvent(e.target.value);
              }}
            />
            <DatePicker
              className="pick-start-date"
              placeholderText="Start Date"
              style={{ marginRight: "10px" }}
              selected={newEvent.start}
              value={newEvent.start}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={(start) => {
                setNewEvent({ ...newEvent, start });
                //update the start date state with the last input
                setStartDateEvent(start);
              }}
            />
            <DatePicker
              className="pick-end-date"
              placeholderText="End Date"
              selected={newEvent.end}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={(end) => {
                setNewEvent({ ...newEvent, end });
                //update the end date state with the last input
                setEndDateEvent(end);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="close-event"
              variant="secondary"
              onClick={handleCloseUpdateDelete}
            />
            <Button
              className="save-event"
              variant="primary"
              onClick={() => {
                setUpdateEvent(true);
                updateSelectedEvent();
              }}
            >
              Update Event
            </Button>
            <Button
              className="delete-event"
              variant="primary"
              onClick={() => {
                setDeleteEvent(true);
                deleteSelectedEvent();
              }}
            >
              Delete Event
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Alert Popups */}
        {warningVisible && <AlertWarning/>}
      </div>
    </>
  );
}
