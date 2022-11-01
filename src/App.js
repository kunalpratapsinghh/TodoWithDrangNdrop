import "./App.css";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import Todo from "./component/Todo";
import Completed from "./component/Completed";
import { DragDropContext } from "react-beautiful-dnd";
import AddTodo from "./component/AddTodo";
let arr = [
  { id: 1, first_name: "Arty", gender: "Male" },
  { id: 2, first_name: "Vita", gender: "Genderfluid" },
  { id: 3, first_name: "Kellyann", gender: "Female" },
  { id: 4, first_name: "Gerik", gender: "Bigender" },
  { id: 5, first_name: "Sherlock", gender: "Male" },
  { id: 6, first_name: "Lebbie", gender: "Female" },
  { id: 7, first_name: "Valma", gender: "Female" },
  { id: 8, first_name: "Barri", gender: "Male" },
  { id: 9, first_name: "Aigneis", gender: "Bigender" },
  { id: 10, first_name: "Fredric", gender: "Male" },
];
let arr1 = [
  { id: 1, first_name: "Dukie", gender: "Male" },
  { id: 2, first_name: "Morgun", gender: "Male" },
  { id: 3, first_name: "Gibb", gender: "Male" },
  { id: 4, first_name: "Marvin", gender: "Male" },
  { id: 5, first_name: "Brynn", gender: "Female" },
  { id: 6, first_name: "Mortimer", gender: "Male" },
  { id: 7, first_name: "Mariellen", gender: "Female" },
  { id: 8, first_name: "Sena", gender: "Female" },
  { id: 9, first_name: "Dulce", gender: "Genderfluid" },
  { id: 10, first_name: "Allard", gender: "Male" },
];

function App() {
  const [todo, setTodo] = useState(arr);
  const [completed, setCompleted] = useState(arr1);

  const handledragEnd = (result) => {
    let { source, destination } = result;

    if (destination == null) return;
    if (source.droppableId === "todo") {
      if (destination.droppableId === "todo") {
        let removed = todo.splice(source.index, 1);
        todo.splice(destination.index, 0, removed[0]);
        console.log(todo);
        setTodo(todo);
      }
      if (destination.droppableId === "completed") {
        let removed = todo.splice(source.index, 1);
        completed.splice(destination.index, 0, removed[0]);
        console.log(completed);
        setCompleted(completed);
      }
    }

    if (source.droppableId === "completed") {
      if (destination.droppableId === "completed") {
        let removed = completed.splice(source.index, 1);
        completed.splice(destination.index, 0, removed[0]);
        console.log(completed);
        setCompleted(completed);
      }

      if (destination.droppableId === "todo") {
        let removed = completed.splice(source.index, 1);
        todo.splice(destination.index, 0, removed[0]);
        console.log(todo);
        setTodo(todo);
      }
    }
  };

  const handlestatus = (element, group) => {
    if (group === "completed") {
      let newarr = completed.filter((el) => el.id !== element.id);
      setCompleted(newarr);
      let newtodo = [...todo, element];
      setTodo(newtodo);
    }
    if (group === "todo") {
      let newarr = todo.filter((el) => el.id !== element.id);
      setTodo(newarr);
      let newtodo = [...completed, element];
      setCompleted(newtodo);
    }
  };

  const handledelete = (element, group) => {
    if (group === "completed") {
      let newarr = completed.filter((el) => el.id !== element.id);
      setCompleted(newarr);
    }
    if (group === "todo") {
      let newarr = todo.filter((el) => el.id !== element.id);
      setTodo(newarr);
    }
  };

  const handleadd = (data) => {
    data = { ...data, id: uuid(), gender: new Date().toDateString() };
    setTodo([...todo, data]);
  };
  return (
    <>
      <AddTodo handleadd={handleadd} />
      <div className="App">
        <DragDropContext onDragEnd={handledragEnd}>
          <Todo
            todo={todo}
            handlestatus={handlestatus}
            handledelete={handledelete}
          />
          <Completed
            completed={completed}
            handlestatus={handlestatus}
            handledelete={handledelete}
          />
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
