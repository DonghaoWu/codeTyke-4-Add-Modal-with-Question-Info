import React, { Fragment } from 'react';
import SelectionBox from '../selectionBox/SelectionBox';
import SubmitButton from '../button/SubmitButton';
import ProgressBar from '../progressBar/ProgressBar';
import Modal from '../modal/Modal';
import InfoModal from '../info/InfoModal';
import ResultInfo from '../resultInfo/ResultInfo'

import './Styles.scss';

const LearningModule = ({ setGameStatus }) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const [showLoader, setShowLoader] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const [selectedAnsArr, setAnswerArr] = React.useState([false, false, false, false]);
  const [resultInfo, setResultInfo] = React.useState('');
  const [mode, setMode] = React.useState('normal');

  let hasSelectedOne = selectedAnsArr.includes(true);

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
        let correctAnswerNum = 0;
        let selectedCorrectAnswerNum = 0;
        let selectedWrongAnswerNum = 0;

        for (let i = 0; i < currentQuestion.possibleAnswers.length; i++) {
          if (currentQuestion.possibleAnswers[i].isCorrect) correctAnswerNum++;
          if (currentQuestion.possibleAnswers[i].isCorrect === true && selectedAnsArr[i] === true) selectedCorrectAnswerNum++;
          if (currentQuestion.possibleAnswers[i].isCorrect === false && selectedAnsArr[i] === true) selectedWrongAnswerNum++;
        }

        if (selectedWrongAnswerNum > 0) {
          setResultInfo('Try again.');
          setMode('try');
        }
        else if (correctAnswerNum > selectedCorrectAnswerNum) {
          setResultInfo('Not all.');
          setMode('notAll');
        }
        else if (correctAnswerNum === selectedCorrectAnswerNum) {
          setResultInfo('Correct!');
          setMode('correct');
        }
        setShowLoader(false);
      }, 500);
    } else {
      setCurrentQuestionId(0);
      setGameStatus({ message: "Great Job! Play again.", loadIntro: true });
    }
  }

  const handleNextQuestion = () => {
    setResultInfo('');
    setAnswerArr([false, false, false, false]);
    setCurrentQuestionId(currentQuestionId + 1);
  }

  let possibleAnswers = [];
  if (currentQuestion.possibleAnswers) {
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox id={index} key={index} answer={answer} selectedAnsArr={selectedAnsArr} setAnswerArr={setAnswerArr} mode={mode} setMode={setMode}/>
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
              <ResultInfo resultInfo={resultInfo} />
              {
                resultInfo === 'Correct!'
                  ?
                  <SubmitButton label="Next" handleSubmit={handleNextQuestion} hasIcons hasSelectedOne={hasSelectedOne} />
                  :
                  <SubmitButton label="Submit" handleSubmit={handleSubmit} showLoader={showLoader} hasIcons hasSelectedOne={hasSelectedOne} />
              }
            </div>
          </div>
        </Fragment>
      }
    </div>
  )
}

export default LearningModule;
