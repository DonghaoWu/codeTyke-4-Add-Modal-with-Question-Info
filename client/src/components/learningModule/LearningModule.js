import React, { Fragment } from 'react';
import axios from 'axios';

import SelectionBox from '../selectionBox/SelectionBox';
import ProgressBar from '../progressBar/ProgressBar';
import SubmitButton from '../submitButton/SubmitButton';
import Modal from '../modal/Modal';
import Info from '../infoModal/InfoModal';
import ResultInfo from '../resultInfo/ResultInfo';

import './Styles.scss';

const LearningModule = ({ setGameStatus }) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [resultInfo, setResultInfo] = React.useState('');
  const [pass, setPass] = React.useState(false);
  const [submitLabel, setSubmitLabel] = React.useState('Submit');
  const [selectedAnsArr, setSelectedAnsArr] = React.useState([false, false, false, false]);

  const [mode, setMode] = React.useState('normal');

  const hasSelected = selectedAnsArr.includes(true);

  let currentQuestion = quizData.questionArr ? quizData.questionArr[currentQuestionId] : {};
  React.useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    try {
      const res = await axios.get("/problems");
      setQuizData(res.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = () => {
    if (pass === true) {
      setPass(false);
      setResultInfo('');
      setSubmitLabel('Submit');
      setMode('normal');
      setSelectedAnsArr([false, false, false, false]);

      if (currentQuestionId === quizData.totalQuestions - 1) {
        setCurrentQuestionId(0);
        setGameStatus({ message: "Great Job! Play again.", loadIntro: true });
      }
      else {
        setCurrentQuestionId(currentQuestionId + 1);
      }
    }

    else if (pass === false) {
      setSubmitLoading(true);
      setTimeout(() => {
        let selectedCorrectAnswerNum = 0;
        let selectedWrongAnswer = false;

        for (let i = 0; i < currentQuestion.possibleAnswers.length; i++) {
          if (currentQuestion.possibleAnswers[i].isCorrect === selectedAnsArr[i]) selectedCorrectAnswerNum++;
          if (currentQuestion.possibleAnswers[i].isCorrect === false && selectedAnsArr[i] === true) {
            selectedWrongAnswer = true;
            break;
          }
        }

        if (selectedWrongAnswer) {
          setPass(false);
          setResultInfo('Try again.');
          setMode('tryAgain');
        }
        else if (selectedCorrectAnswerNum !== currentQuestion.possibleAnswers.length) {
          setMode('notAll');
          setResultInfo('Not all.');
          setPass(false);
        }
        else if (selectedCorrectAnswerNum === currentQuestion.possibleAnswers.length) {
          setPass(true);
          setResultInfo('Correct!');
          setMode('correct');
          if (currentQuestionId === quizData.totalQuestions - 1) setSubmitLabel('Finish');
          else setSubmitLabel('Next');
        }
        setSubmitLoading(false);
      }, 500)
    }
  }

  const handleSetModal = () => {
    setModal(!modal);
  }

  let possibleAnswers = [];
  if (currentQuestion.possibleAnswers) {
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox
        answerId={index}
        key={index}
        answer={answer}
        selectedAnsArr={selectedAnsArr}
        setSelectedAnsArr={setSelectedAnsArr}
        mode={mode}
        setMode={setMode} />
    })
  }

  return (
    <div className="learningModule">
      {currentQuestion.title &&
        <Fragment>
          {
            modal &&
            <Modal>
              <Info handleSetModal={handleSetModal} currentQuestion={currentQuestion} />
            </Modal>
          }
          <ProgressBar totalQuestions={quizData.totalQuestions} id={currentQuestion.id} />
          <div className="learningModule__header">
            <div className="learningModule__titleContainer">
              <div className="learningModule__title">
                {currentQuestion.title}
              </div>
              <i className="fas fa-info-circle infoIcon" onClick={handleSetModal}></i>
            </div>
            <div className="learningModule__subHeader">
              {currentQuestion.additionalInfo}
            </div>
          </div>

          <div className="learningModule__answerArea">
            <div className="learningModule__selections">
              {possibleAnswers}
            </div>
            <div className="learningModule__submitButtonContainer">
              <ResultInfo resultInfo={resultInfo} />
              <SubmitButton label={submitLabel} handleSubmit={handleSubmit} submitLoading={submitLoading} hasSelected={hasSelected} />
            </div>
          </div>
        </Fragment>
      }
    </div>
  )
}

export default LearningModule;
