const questions = [
    {
      text: "If there was a fire, what would your friend save?",
      choices: [
        { image: "money.jpg", alt: "Money", correct: false },
        { image: "girlfriend.jpg", alt: "Girlfriend", correct: false },
        { image: "mother.jpg", alt: "Mother", correct: true },
        { image: "degree.jpg", alt: "Degree Certificate", correct: false },
      ],
    },
    // Add more questions dynamically based on your game logic
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let leaderboard = [];
  
  function showQuestion() {
    const questionElement = document.getElementById("question");
    const choiceContainer = document.getElementById("choices");
  
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.text;
  
    // Clear old choices
    choiceContainer.innerHTML = "";
  
    // Display new choices
    currentQuestion.choices.forEach((choice, index) => {
      const img = document.createElement("img");
      img.src = choice.image;
      img.alt = choice.alt;
      img.className = "choice";
      img.onclick = () => selectAnswer(index);
      choiceContainer.appendChild(img);
    });
  }
  
  function selectAnswer(choiceIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.choices[choiceIndex].correct) {
      score++;
    }
    document.getElementById("nextButton").style.display = "block";
  }
  
  function nextQuestion() {
    const gameElement = document.getElementById("game");
    gameElement.style.opacity = "0"; // Start fade-out animation
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
        gameElement.style.opacity = "1"; // Fade back in
        document.getElementById("nextButton").style.display = "none";
      } else {
        endGame();
      }
    }, 500); // Wait for fade-out animation before showing next question
  }
  
  function endGame() {
    const playerName = prompt("Enter your name for the leaderboard:");
    updateLeaderboard(playerName, score);
    alert(`Game Over! Your score is ${score}/${questions.length}`);
    displayLeaderboard();
  }
  
  function updateLeaderboard(playerName, score) {
    leaderboard.push({ name: playerName, score: score });
    leaderboard.sort((a, b) => b.score - a.score); // Sort scores in descending order
  }
  
  function displayLeaderboard() {
    const leaderboardElement = document.getElementById("leaderboard");
    const scoreList = document.getElementById("scoreList");
    scoreList.innerHTML = ""; // Clear existing scores
  
    leaderboard.forEach((entry) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${entry.name}: ${entry.score}`;
      scoreList.appendChild(listItem);
    });
  
    leaderboardElement.style.display = "block"; // Show leaderboard
  }
  
  // Initialize the game
  showQuestion();
  