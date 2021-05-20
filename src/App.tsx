import React from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { darkModeToggle } from "./slices/darkmode-slice/darkModeSlice";

function App() {
  const darkMode = useAppSelector((state) => state.darkMode);
  const dispatch = useAppDispatch();
  const onToggleDarkMode = () => {
    dispatch(darkModeToggle());
  };

  return (
    <div className="App">
      {JSON.stringify(darkMode)}
      <button onClick={onToggleDarkMode}>toggle dark mode</button>
    </div>
  );
}

export default App;
