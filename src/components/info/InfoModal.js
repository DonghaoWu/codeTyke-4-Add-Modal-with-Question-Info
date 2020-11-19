import React from 'react';
import './Styles.scss';

class InfoModal extends React.Component {

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    handleClickOutside = (event) => {
        const { handleSetModal } = this.props;
        if (this.node.contains(event.target)) return;
        return handleSetModal();
    }

    render() {
        const { currentQuestion, handleSetModal } = this.props;
        return (
            <div className='infoModal'>
                <div ref={node => this.node = node} className='infoModal--container'>
                    <div className='infoModal--modal-close' onClick={handleSetModal}>
                        &times;
                    </div>

                    <div className='infoModal--contentCcontainer'>
                        <div className='infoModal--title'>Rules</div>
                        <p className='infoModal--text'>
                            {currentQuestion.additionalInfo}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoModal;