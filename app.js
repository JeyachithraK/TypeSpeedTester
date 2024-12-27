const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect.",
    "Success is not final, failure is not fatal.",
    "Typing is a skill that improves with practice."
  ];
  
  const quoteDisplay = document.getElementById("quote");
  const inputField = document.getElementById("input");
  const startBtn = document.getElementById("startBtn");
  const endBtn = document.getElementById("endBtn");
  const correctionsBtn = document.getElementById("correctionsBtn");
  const timeDisplay = document.getElementById("time");
  const accuracyDisplay = document.getElementById("accuracy");
  const speedDisplay = document.getElementById("speed");
  const completionMessage = document.getElementById("completionMessage");
  const progressBar = document.querySelector(".progress");
  const leaderboardList = document.getElementById("leaderboard");

  let currentQuote = "";
  let startTime = null;
  let timerInterval = null;
  
  // Leaderboard management
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  
  // Generate a random quote
  function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote = quotes[randomIndex];
    quoteDisplay.textContent = currentQuote;
  }
  
  // Start the typing test
  startBtn.addEventListener("click", () => {
    resetTest();
    inputField.disabled = false;
    inputField.focus();
    generateQuote();
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
    startBtn.disabled = true;
    endBtn.disabled = false;
    correctionsBtn.disabled = true;
  });
  
  // End the test and display results
  endBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    calculateResults();
    inputField.disabled = true;
    startBtn.disabled = false;
    endBtn.disabled = true;
    correctionsBtn.disabled = false;
    updateLeaderboard();
  });
  
  // See corrections
  correctionsBtn.addEventListener("click", () => {
    const inputText = inputField.value;
    let highlightedText = "";
    for (let i = 0; i < currentQuote.length; i++) {
      if (inputText[i] === currentQuote[i]) {
        highlightedText += currentQuote[i];
      } else {
        highlightedText += `<span class="mistake">${currentQuote[i]}</span>`;
      }
    }
    quoteDisplay.innerHTML = highlightedText;
  });
  
  // Reset test
  function resetTest() {
    clearInterval(timerInterval);
    timeDisplay.textContent = 0;
    accuracyDisplay.textContent = 0;
    speedDisplay.textContent = 0;
    inputField.value = "";
    progressBar.style.width = "0%";
    completionMessage.textContent = "";
    quoteDisplay.innerHTML = "";
  }
  
  // Update the timer
  function updateTimer() {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    timeDisplay.textContent = elapsedTime;
    const progress = Math.min((inputField.value.length / currentQuote.length) * 100, 100);
    progressBar.style.width = `${progress}%`;
  }
  
  // Calculate results
  function calculateResults() {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    const wordsTyped = currentQuote.split(" ").length;
    const wpm = Math.round((wordsTyped / elapsedTime) * 60);
  
    const inputText = inputField.value;
    const correctChars = inputText.split("").filter((char, index) => char === currentQuote[index]).length;
    const accuracy = Math.round((correctChars / currentQuote.length) * 100);
  
    timeDisplay.textContent = elapsedTime;
    speedDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
    completionMessage.textContent = wpm >= 40 ? "Great job!" : "Keep practicing!";
  }
  
// Update leaderboard
function updateLeaderboard() {
    const wpm = parseInt(speedDisplay.textContent);
    leaderboard.push(wpm);
    leaderboard.sort((a, b) => b - a); // Sort leaderboard in descending order
    leaderboard = leaderboard.slice(0, 5); // Keep top 5 scores
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard)); // Save to localStorage
    displayLeaderboard(); // Update leaderboard display
  }
  
  // Initialize leaderboard
  function displayLeaderboard() {
    leaderboardList.innerHTML = ""; // Clear existing leaderboard
    leaderboard.forEach((score, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>#${index + 1}</td>
        <td>${score} WPM</td>
      `;
      leaderboardList.appendChild(row);
    });
  }
  
  // Display leaderboard on page load
  window.onload = function () {
    displayLeaderboard(); // Load and display leaderboard when page is loaded
  };