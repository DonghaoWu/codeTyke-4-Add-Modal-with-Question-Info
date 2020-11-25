import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

import './Styles.scss';

const SubmitButton = (props) => {
    const { hasSelectedOne } = props;
    return (
        <div>{
            hasSelectedOne ?
                (
                    <div className={"submitButton " + (props.hasIcons && "hasIcons")} onClick={props.handleSubmit} >
                        <div className="placeholder"></div>
                        <div className="submitButton--label">{props.label}</div>
                        <div className="icon">
                            {props.showLoader && <FontAwesomeIcon icon={faSync} className="spinningLoader" />}
                        </div>
                    </div>
                )
                :
                (
                    <div className={"submitButton " + (props.hasIcons && "hasIcons") + " submitButton--disabled"}  >
                        <div className="placeholder"></div>
                        <div className="submitButton--label">{props.label}</div>
                        <div className="icon">
                            {props.showLoader && <FontAwesomeIcon icon={faSync} className="spinningLoader" />}
                        </div>
                    </div>
                )
        }
        </div>
    )
}

export default SubmitButton;