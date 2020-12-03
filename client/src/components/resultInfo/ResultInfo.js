import React from 'react';
import './Styles.scss';

const ResultInfo = (props) => {
    const { resultInfo } = props;
    let color = '';
    if (resultInfo === 'Try again.') color = 'red';
    if (resultInfo === 'Not all.') color = 'orange';
    if (resultInfo === 'Correct!') color = 'green';
    return (
        <div className={`resultInfo resultInfo--${color}`}>
            {resultInfo}
        </div>
    )
}

export default ResultInfo;