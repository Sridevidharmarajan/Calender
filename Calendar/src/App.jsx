import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import left_arrow from "./assets/bi-arrow-left-circle.svg";
import right_arrow from "./assets/bi-arrow-right-circle.svg";
import TodoComponent from './components/TodoComponent.jsx'; // Import TodoComponent

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Event = ({ event }) => {
  const [, drag] = useDrag(() => ({
    type: 'event',
    item: { id: event.id }
  }));

  return (
    <div ref={drag} style={{ backgroundColor: event.color }}>
      {event.title}
    </div>
  );
};

const CalendarDay = ({ date, events, handleAddTodo, todos, handleRemoveTodo }) => {
  const [, drop] = useDrop(() => ({
    accept: 'event',
    drop: (item) => handleDrop(item, date)
  }));

  const formatDate = (date) => date.toISOString().split('T')[0];

  return (
    <div ref={drop} className={date ? "day" : "empty"} onClick={() => date && handleAddTodo(formatDate(date))}>
      {date ? (
        <>
          <div>{date.getDate()}</div>
          <ul>
            {todos[formatDate(date)]?.map((todo, i) => (
              <li key={i}>
                {todo} <button onClick={(e) => {e.stopPropagation(); handleRemoveTodo(formatDate(date), i);}}>x</button>
              </li>
            ))}
          </ul>
          {events.map(event => <Event key={event.id} event={event} />)}
        </>
      ) : ""}
    </div>
  );
};

const Calendar = ({ todos, setTodos, events, setEvents, searchTerm, setSearchTerm, view, setView, selectedDate, setSelectedDate }) => {
  const handleChangeMonth = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setSelectedDate(new Date(selectedDate.setMonth(newMonth)));
  };

  const handleChangeYear = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setSelectedDate(new Date(selectedDate.setFullYear(newYear)));
  };

  const daysInMonth = () => {
    const daysArray = [];
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
    }

    return daysArray;
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const handleAddTodo = (date) => {
    const todo = prompt("Enter to-do item:");
    if (todo) {
      setTodos({
        ...todos,
        [date]: [...(todos[date] || []), todo]
      });
    }
  };

  const handleRemoveTodo = (date, index) => {
    const newTodos = todos[date].filter((_, i) => i !== index);
    setTodos({
      ...todos,
      [date]: newTodos
    });
  };

  const formatDate = (date) => date.toISOString().split('T')[0];

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePreviousMonth}>
          <img src={left_arrow} alt="Previous month" />
        </button>
        <select value={selectedDate.getMonth()} onChange={handleChangeMonth}>
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select value={selectedDate.getFullYear()} onChange={handleChangeYear}>
          {Array.from({ length: 10 }, (_, i) => selectedDate.getFullYear() - 5 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button onClick={handleNextMonth}>
          <img src={right_arrow} alt="Next month" />
        </button>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search events"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="daysOfWeek">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="days">
        {daysInMonth().map((day, index) => (
          <CalendarDay
            key={index}
            date={day}
            events={filteredEvents.filter(event => formatDate(new Date(event.startDate)) === formatDate(day))}
            handleAddTodo={handleAddTodo}
            todos={todos}
            handleRemoveTodo={handleRemoveTodo}
          />
        ))}
      </div>
    </div>
  );
};

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos, setTodos] = useState({});
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('monthly');

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Calendar
          todos={todos}
          setTodos={setTodos}
          events={events}
          setEvents={setEvents}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          view={view}
          setView={setView}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        {/* Add TodoComponent at the bottom */}
        <TodoComponent />
      </div>
    </DndProvider>
  );
}

export default App;
