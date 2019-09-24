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
    traffic: 3,
};

const getCountElements = (heightElement) => document.documentElement.clientHeight / heightElement + 1;

const startGame = () => {
    start.classList.add('hide');

    for (let index = 0; index < getCountElements(100); index++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = `${(index * 100)}px`;
        line.y = index * 100;
        gameArea.appendChild(line);
    }

    for (let index = 0; index < getCountElements(100 * setting.traffic); index++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = (index + 1) * (-100) * setting.traffic;
        enemy.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`;
        enemy.style.top = `${(enemy.y)}px`;
        enemy.style.background = 'transparent url("./image/enemy.png") center / cover no-repeat';
        gameArea.appendChild(enemy);
    }
    
    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
};

start.addEventListener('click', startGame)

const startRun = (event) => {
    event.preventDefault();
    keys[event.key] = true;
    console.log(event);
};
const moveRoad = () => {
    const lines = document.querySelectorAll('.line');
    lines.forEach(line => {
        line.y += setting.speed;
        line.style.top = `${line.y}px`;
        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    });
};
const moveEnemy = () => {
    const enemys = document.querySelectorAll('.enemy');
    enemys.forEach(enemy => {
        enemy.y += setting.speed / 2;
        enemy.style.top = `${enemy.y}px`;
        if (enemy.y >= document.documentElement.clientHeight) {
            enemy.y = -100 * setting.traffic;
            enemy.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`;
        }
    });
};

const playGame = () => {
    // console.log('Start Game');
    if (setting.start) {
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }
        
        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }
        car.style.left = `${setting.x}px`;
        car.style.top = `${setting.y}px`;
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