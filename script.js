let boxes = document.querySelectorAll(`.box`);
let resetBtn = document.querySelector(`#reset-btn`);
let newGameBtn = document.querySelector(`#new-btn`);
let msgBox = document.querySelector(`.msg-box`);
let msg = document.querySelector(`#msg`);
let player1 = document.querySelector(`#player1-score`);
let player2 = document.querySelector(`#player2-score`);
let tMatch = document.querySelector(`#total-match`);
let dMatch = document.querySelector(`#total-draw`);
let p1Turn = document.querySelector(`.p1Position`);
let p2Turn = document.querySelector(`.p2Position`);

let turnO = true;
let count = 0;
let player1Score = 0;
let player2Score = 0;
let totalMatch = 0;
let totalDraw = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((box) => {
    box.addEventListener(`click`, () => {
        if (turnO) {
            box.style.color = `#A288E3`;
            box.innerText = `O`;
            turnO = false;
        } else {
            box.style.color = `#6D458F`;
            box.innerText = `X`;
            turnO = true;
        }
        count++;
        box.disabled = true;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {    
    totalDraw++;
    dMatch.innerText = `Total Draw : ${totalDraw}`;
    msg.innerText = `Game Over, It's a Draw🤝`;
    printMsg();
}

const printMsg = () => {
    NumberMatch();
    setTimeout(() => {
        msgBox.classList.remove(`hide`);
    }, 1000);
}

const NumberMatch = () => {
    totalMatch++;
    tMatch.innerText = `Total Match : ${totalMatch}`;
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner 🥇 is ${winner}`;
    printMsg();
}

let checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != `` && pos2Val != `` && pos3Val != ``) {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                
                for (let pos of pattern) {
                    boxes[pos].style.backgroundColor = `#8867B9`;
                    boxes[pos].style.border = `3px solid #38023B`;
                    boxes[pos].style.color = `#38023B`;
                }

                boxes.forEach((box) => {
                    box.disabled = true;
                });

                playersScore(pos1Val);

                showWinner(pos1Val);

                return true;
            }
        }
    }
}

let playersScore = (player) => {
    if (player === `O`) {
        player1Score++;
        player1.innerText = `Score : ${player1Score}`;
    } else if (player === `X`) {
        player2Score++;
        player2.innerText = `Score : ${player2Score}`;
    }
}

const resetGame = () => {
    turnO = !turnO;
    count = 0;

    boxes.forEach((box) => {
        box.innerText = ``;
        box.style.backgroundColor = `#E1DAF6`;
        box.style.border = `none`;
        box.disabled = false;
    });

    msgBox.classList.add(`hide`);
}

resetBtn.addEventListener(`click`, resetGame);
newGameBtn.addEventListener(`click`, resetGame);