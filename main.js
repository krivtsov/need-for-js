const score = document.querySelector('.score');

const start = document.querySelector('.start');

const gameArea = document.querySelector('.gameArea');

const car = document.createElement('div');

car.classList.add('car');

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
};

const setting = {
    start: false,
    score: 0,
    speed: 3,
};

const startGame = () => {
    start.classList.add('hide');
    setting.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame);
};

start.addEventListener('click', startGame)

const startRun = (event) => {
    event.preventDefault();
    keys[event.key] = true;
    console.log(event);
};

const playGame = () => {
    console.log('Start Game');
    if (setting.start) {
        requestAnimationFrame(playGame);
    }
}

const stopRun = (event) => {
    event.preventDefault();
    keys[event.key] = false;
    console.log('stop');
};

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);