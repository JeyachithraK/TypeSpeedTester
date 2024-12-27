// Retrieve test results and leaderboard from localStorage
const time = localStorage.getItem("time"); // Time taken for the test
const speed = localStorage.getItem("wpm"); // WPM
const accuracy = localStorage.getItem("accuracy"); // Accuracy percentage
const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// Display the results
document.getElementById("time").textContent = time;
document.getElementById("speed").textContent = speed;
document.getElementById("accuracy").textContent = accuracy;

const completionMessage = document.getElementById("completionMessage");
completionMessage.textContent = parseInt(speed) >= 40 ? "Great job!" : "Keep practicing!";

// Display leaderboard
function displayLeaderboard() {
  const leaderboardList = document.getElementById("leaderboard");
  leaderboardList.innerHTML = "";

  leaderboard.forEach((score, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>#${index + 1}</td>
      <td>${score.wpm} WPM</td>
      <td>${score.date}</td>
    `;
    leaderboardList.appendChild(row);
  });
}

// Populate leaderboard
displayLeaderboard();

// Go back to test page
document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "index.html"; // Adjust if your start test page is named differently
});
