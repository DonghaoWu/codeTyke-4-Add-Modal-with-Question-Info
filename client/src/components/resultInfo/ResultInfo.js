import React from 'react';

const ResultInfo = (props) => {
    const { resultInfo } = props;
    let color = '';
    if (resultInfo === 'Try again.' || 'Not all.') color = 'red';
    if (resultInfo === 'Correct!') color = 'green';
    return (
        <div className={`learningModule--resultInfo ${color}`}>
            {resultInfo}
        </div>
    )
}

export default ResultInfo;