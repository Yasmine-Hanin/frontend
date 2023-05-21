import React, { useState } from "react";

function Toggle(props) {
  const [isActive, setIsActive] = useState(props.defaultActive || false);

  const handleClick = () => {
    const newState = !isActive;
    setIsActive(newState);
    if (props.onToggle) {
      props.onToggle(newState);
    }
  };

  return (
    <button
      className={isActive ? props.activeClass : props.inactiveClass}
      onClick={handleClick}
      title={props.title}
    >
      {props.icon}
    </button>
  );
}

export default Toggle;
