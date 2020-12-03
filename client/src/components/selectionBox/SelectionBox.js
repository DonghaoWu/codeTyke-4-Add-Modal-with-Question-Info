import React from 'react';

import './Styles.scss';

const SelectionBox = (props) => {
  const { selectedAnsArr, setSelectedAnsArr, answerId, mode, setMode } = props;
  const isChecked = selectedAnsArr[answerId];
  const activeMode = isChecked ? `selectionBox--${mode}` : '';

  const handleSelect = () => {
    let newSelectedAnsArr = [];
    if (mode !== 'normal') {
      setMode('normal');
      newSelectedAnsArr = [false, false, false, false];
      newSelectedAnsArr[answerId] = true;
    }
    else {
      newSelectedAnsArr = selectedAnsArr.slice();
      newSelectedAnsArr[answerId] = !isChecked;
    }
    setSelectedAnsArr(newSelectedAnsArr);
  }

  return (
    <div className={`selectionBox ${activeMode}`}>
      <img className="selectionBox__image" alt={props.answer.imageAlt} src={props.answer.image} />
      <div className='selectionBox__checkboxTextContainer'>
        <input className={`selectionBox__checkbox`} type="checkbox" checked={isChecked} onChange={handleSelect} />
        <span className="selectionBox__text">{props.answer.text}</span>
      </div>
    </div>
  )
}

export default SelectionBox;