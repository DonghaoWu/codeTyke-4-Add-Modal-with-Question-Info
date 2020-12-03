import React from 'react';
import './Styles.scss';

const StartButton = (props) => {
  return (
    <div className={"startButton"} onClick={props.handleSubmit} >
      {props.label}
    </div>
  )
}

export default StartButton;