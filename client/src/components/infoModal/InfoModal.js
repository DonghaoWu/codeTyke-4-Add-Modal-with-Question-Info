import React from 'react';
import './Styles.scss';

class InfoModal extends React.Component {
    constructor(props) {
        super(props)
    }

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
                <div ref={node => this.node = node} className='infoModal__container'>
                    <div className='infoModal__closeIcon' >
                        <div onClick={handleSetModal}>&times;</div>
                    </div>

                    <div className='infoModal__contentContainer'>
                        <div className='infoModal__title'>Rules</div>
                        <p className='infoModal__text'>
                            {currentQuestion.additionalInfo}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoModal;