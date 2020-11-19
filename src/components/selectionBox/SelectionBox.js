import React from 'react';

import './Styles.scss';

const SelectionBox = (props) => {
  const { selectedAnsArr, setAnswerArr } = props;
  const active = selectedAnsArr[props.id] ? "selectionBox--active" : '';

  const handleSelect = () => {
    let newArray = selectedAnsArr.slice();
    newArray[props.id] = !newArray[props.id];
    setAnswerArr(newArray);
  }

  return (
    <div
      className={`selectionBox ${active}`} id={"selectionBox" + props.id}>
      <img className="selectionBox--image" alt={props.answer.imageAlt} src={props.answer.image} />
      <input className={`selectionBox--checkbox`} type="checkbox" checked={selectedAnsArr[props.id]} onChange={handleSelect} />
      <span className="selectionBox--text">{props.answer.text}</span>
    </div>
  )
}

export default SelectionBox;
