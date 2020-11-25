import React from 'react';

import './Styles.scss';

const SelectionBox = (props) => {
  const { selectedAnsArr, setAnswerArr, setMode, mode } = props;
  const active = selectedAnsArr[props.id] ? "selectionBox--active" : '';

  const handleSelect = () => {
    let newArray = selectedAnsArr.slice();
    newArray[props.id] = !newArray[props.id];
    setAnswerArr(newArray);
    setMode('normal');
  }

  let cardBackGroudColor = '';
  if(active){
    if(mode === 'normal') cardBackGroudColor = 'blue';
    if(mode === 'try') cardBackGroudColor = 'red';
    if(mode === 'notAll') cardBackGroudColor = 'orange';
    if(mode === 'correct') cardBackGroudColor = 'green';
  }

  return (
    <div
      className={`selectionBox selectionBox--${cardBackGroudColor}`} id={"selectionBox" + props.id}>
      <img className="selectionBox--image" alt={props.answer.imageAlt} src={props.answer.image} />
      <input className={`selectionBox--checkbox`} type="checkbox" checked={selectedAnsArr[props.id]} onChange={handleSelect} />
      <span className="selectionBox--text">{props.answer.text}</span>
    </div>
  )
}

export default SelectionBox;
