'use strics';

let gScores, gRoundScore, gActivePlayer, gLastRoll, gIsGamePlaying, gTargetScore;

const init = () => {
    gScores = [0, 0];
    gRoundScore = 0;
    gActivePlayer = 0;
    gLastRoll = 0;
    gIsGamePlaying = true;
    hideDice();
    zeroPlayerScores(0);
    zeroPlayerScores(1);
    setPlayersName();
    removePlayersClass('active');
    removePlayersClass('winner');
    addClass(getPlayerPanelElement(0), 'active');
};

const hideDice = () => {
    getDiceElement().style.display = 'none';
};

const getDiceElement = () => {
    return document.querySelector('.dice');
};

const zeroPlayerScores = (playerIdx) => {
    gScores[playerIdx] = 0;
    zeroPlayerCurrScore(playerIdx);
    getPlayerTotalScoreElement(playerIdx).innerText = '0';
};

const zeroPlayerCurrScore = (playerIdx) => {
    getPlayerCurrScoreElement(playerIdx).innerText = '0';
};

const getPlayerTotalScoreElement = (playerIdx) => {
    return document.querySelector(`.total-score-${playerIdx}`);
};

const getPlayerCurrScoreElement = (playerIdx) => {
    return document.querySelector(`.curr-score-${playerIdx}`);
};

const setPlayersName = () => {
    playerText(0).innerText = 'Player 1';
    playerText(1).innerText = 'Player 2';
};

const playerText = (playerIdx) => {
    return document.getElementById('name-' + playerIdx);
};

const removePlayersClass = (className) => {
    removeClass(getPlayerPanelElement(0), className);
    removeClass(getPlayerPanelElement(1), className);
};

const removeClass = (element, className) => {
    element.classList.remove(className);
};

const addClass = (element, className) => {
    element.classList.add(className);
};

const getPlayerPanelElement = (playerIdx) => {
    return document.querySelector(`.player-${playerIdx}-panel`);
};

const onRollDice = () => {
    if (gIsGamePlaying) {
        rollDiceHandler();
    };
};

const rollDiceHandler = () => {
    const roll = getRandomNum();
    const diceElement = getDiceElement();
    diceElement.style.display = 'block';
    diceElement.src = './assets/dice-' + roll + '.jpg';

    if (roll !== 1) {
        updateScore(roll);
        rollSixHandler(roll);
    } else {
        switchPlayer(gActivePlayer);
    };
};

const getRandomNum = () => {
    return Math.floor(Math.random() * 6) + 1;
};

const updateScore = (currRoll) => {
    gRoundScore += currRoll;
    const currPlayerScore = getPlayerCurrScoreElement(gActivePlayer);
    currPlayerScore.innerText = gRoundScore;
};

const rollSixHandler = (roll) => {
    if (roll === 6) {
        gLastRoll += roll;
    } else {
        gLastRoll = 0;
    };
    punishForDoubleSix();
};

const punishForDoubleSix = () => {
    if (gLastRoll === 12) {
        zeroPlayerScores(gActivePlayer);
        switchPlayer(gActivePlayer);
    };
};

const onHoldScore = () => {
    if (gIsGamePlaying) {
        holdRoundScore();
        finishRoundHandler();
    };
};

const holdRoundScore = () => {
    gScores[gActivePlayer] += gRoundScore;
    const playerTotalScore = getPlayerTotalScoreElement(gActivePlayer);
    playerTotalScore.innerText = gScores[gActivePlayer];
};

const finishRoundHandler = () => {
    getTargrtScore();
    const isWin = (gScores[gActivePlayer] >= gTargetScore);
    isWin ? declareWinner(gActivePlayer) : switchPlayer(gActivePlayer);
};

const getTargrtScore = () => {
    const isPlayerSetTargetScore = document.querySelector('.target').value;
    gTargetScore = isPlayerSetTargetScore ? isPlayerSetTargetScore : 100;
};

const declareWinner = (playerIdx) => {
    zeroPlayerCurrScore(playerIdx);
    removePlayersClass();
    hideDice();
    playerText(playerIdx).innerText = 'Winner!';
    addClass(getPlayerPanelElement(playerIdx), 'winner');
    gIsGamePlaying = false;
};

const onNewGame = () => {
    init();
};

const switchPlayer = (playerIdx) => {
    gActivePlayer === 0 ? gActivePlayer = 1 : gActivePlayer = 0;
    gRoundScore = 0;
    zeroPlayerCurrScore(playerIdx);
    getPlayerPanelElement(0).classList.toggle('active');
    getPlayerPanelElement(1).classList.toggle('active');
};