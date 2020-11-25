const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const quizObj = require('./data');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/problems', (req, res) => {
  res.json(quizObj);
})

// app.get('/checkanswer/:id', (req, res) => {
//   let id = req.params.id;
//   let answers = req.query.answers.split(",");
//   let solutionArr = questionArr[id].possibleAnswers.map((answer) => answer.isCorrect.toString());

//   for (let i in answers) {
//     if (answers[i] !== solutionArr[i]) {
//       res.json({ result: false });
//       return;
//     }
//   }

//   res.json({ result: true });
//   return;
// })

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});
