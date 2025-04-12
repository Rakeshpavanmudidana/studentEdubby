const questions = [];
    const answers = {};

    const askBtn = document.getElementById('askBtn');
    askBtn.addEventListener('click', addQuestion);
    const submitAnswerBtn = document.getElementById('submitAnswer');
    submitAnswerBtn.addEventListener('click', submitAnswer);

    function addQuestion() {
      const question = document.getElementById('questionInput').value.trim();
      if (question === '') return;
      questions.push(question);
      renderQuestions();
      document.getElementById('questionInput').value = '';
    }

    function renderQuestions() {
      const container = document.getElementById('questionsContainer');
      container.innerHTML = '';
      questions.forEach((q, index) => {
        const div = document.createElement('div');
        div.className = 'question';
        div.innerText = q;
        div.onclick = () => openAnswerBox(index);
        container.appendChild(div);
      });
    }

    function openAnswerBox(index) {
      const section = document.getElementById('answerSection');
      section.style.display = 'block';
      document.getElementById('selectedQuestion').innerText = questions[index];
      document.getElementById('answerInput').value = '';
      section.dataset.currentQuestion = index;
    }

    function submitAnswer() {
      const index = document.getElementById('answerSection').dataset.currentQuestion;
      const answer = document.getElementById('answerInput').value.trim();
      if (answer === '') {
        alert("Please enter an answer.");
        return;
      }
      answers[index] = answer;
      alert("Answer submitted successfully!");
      document.getElementById('answerSection').style.display = 'none';
    }