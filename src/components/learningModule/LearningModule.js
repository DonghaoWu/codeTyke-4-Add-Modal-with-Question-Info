import React, { Fragment } from 'react';
import SelectionBox from '../selectionBox/SelectionBox';
import Button from '../button/Button';
import ProgressBar from '../progressBar/ProgressBar';
import Modal from '../modal/Modal';
import InfoModal from '../info/InfoModal';

import './Styles.scss';

const LearningModule = ({ setGameStatus }) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const [showLoader, setShowLoader] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  let currentQuestion = quizData.questionArr ? quizData.questionArr[currentQuestionId] : {};
  React.useEffect(() => {
    getQuizData();
  }, []);

  const handleSetModal = () => {
    setModal(!modal);
  }

  const getQuizData = () => {
    fetch("http://localhost:8080/problems")
      .then((res) => {
        return res.json();
      }).then((data) => {
        setQuizData(data);
      }).catch((err) => {
        console.log(err);
      });
  }

  const handleSubmit = () => {
    if (currentQuestionId < quizData.totalQuestions - 1) {
      setShowLoader(true);
      setTimeout(function () {
        console.log("Checking answer...");
        setCurrentQuestionId(currentQuestionId + 1);
        setShowLoader(false);
      }, 500);
    } else {
      setCurrentQuestionId(0);
      setGameStatus({ message: "Great Job! Play again.", loadIntro: true });
    }
  }
  let possibleAnswers = [];
  if (currentQuestion.possibleAnswers) {
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox id={index} key={index} answer={answer} />
    })
  }


  return (
    <div className="learningModule">
      {currentQuestion.title &&
        <Fragment>
          {
            modal &&
            <Modal>
              <InfoModal handleSetModal={handleSetModal} currentQuestion={currentQuestion} />
            </Modal>
          }
          <ProgressBar totalQuestions={quizData.totalQuestions} id={currentQuestion.id} />
          <div className="learningModule--header">
            <div className="learningModule--titleContainer">
              <div className="learningModule--title">
                {currentQuestion.title}
              </div>
              <i className="fas fa-info-circle" onClick={handleSetModal}></i>
            </div>
            <div className="learningModule--subHeader">
              {currentQuestion.additionalInfo}
            </div>
          </div>

          <div className="learningModule--answerArea">
            <div className="learningModule--selections">
              {possibleAnswers}
            </div>
            <div className="learningModule--submitButtonContainer">
              <Button label="Submit" handleSubmit={handleSubmit} showLoader={showLoader} hasIcons />
            </div>
          </div>
        </Fragment>
      }
    </div>
  )
}

export default LearningModule;
