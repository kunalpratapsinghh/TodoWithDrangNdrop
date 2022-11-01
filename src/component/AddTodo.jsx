import React from "react";
import "./Addtodo.scss";
import { useState } from "react";
const AddTodo = ({ handleadd }) => {
  const [state, setState] = useState({ id: "", first_name: "", gender: "" });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div>
      <div className="container">
        <div className="demo-flex-spacer"></div>
        <h1 className="demo">Add todo</h1>

        <div className="webflow-style-input">
          <input
            type="text"
            name="first_name"
            onChange={handlechange}
            placeholder="Enter your Task"
          ></input>
          <button onClick={() => handleadd(state)}>Add</button>
        </div>

        <div className="demo-flex-spacer"></div>
      </div>
    </div>
  );
};

export default AddTodo;
