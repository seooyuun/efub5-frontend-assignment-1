const humanScore = document.getElementById("human-score");
const computerScore = document.getElementById("computer-score");

const result = document.getElementById("result");

const humanChoiceImg = document.getElementById("human-choice");
const computerChoiceImg = document.getElementById("computer-choice");

const rockBtn = document.getElementById("rock");
const scissorsBtn = document.getElementById("scissors");
const paperBtn = document.getElementById("paper");

const resetBtn = document.getElementById("reset");

// 가위바위보 이미지 매핑
const choices = {
  rock: "images/rock.png",
  scissors: "images/scissors.png",
  paper: "images/paper.png",
};

// 가위바위보 게임 실행
function Game(humanChoice) {
  humanChoiceImg.src = choices[humanChoice];

  const computerKeys = Object.keys(choices);
  const computerChoice = computerKeys[Math.floor(Math.random() * 3)]; // 랜덤 선택

  computerChoiceImg.src = choices[computerChoice];

  // 승패
  if (humanChoice === computerChoice) {
    result.innerText = "무승부O.O";
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "scissors" && computerChoice === "paper") ||
    (humanChoice === "paper" && computerChoice === "rock")
  ) {
    result.innerText = "승리!>.<";
    const curNum = parseInt(humanScore.innerText) || 0;
    humanScore.innerText = curNum + 1;
  } else {
    result.innerText = "패배ㅜ.ㅜ";
    const curNum = parseInt(computerScore.innerText) || 0;
    computerScore.innerText = curNum + 1;
  }
}

// 가위바위보 버튼
rockBtn.onclick = () => Game("rock");
scissorsBtn.onclick = () => Game("scissors");
paperBtn.onclick = () => Game("paper");

// 리셋 버튼
resetBtn.onclick = () => {
  humanScore.innerText = 0;
  computerScore.innerText = 0;
  result.innerText = "가위, 바위, 보 중 하나를 선택하세요. 게임이 시작됩니다.";
  humanChoiceImg.src = "images/clear.png";
  computerChoiceImg.src = "images/clear.png";
};
