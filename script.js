const startGame = document.querySelector('.start-game');
const cardGame = document.querySelector('.card-game');
const cards = document.querySelectorAll('.card');
const front = document.querySelectorAll('.front');
const duration = document.querySelector('.gamer-statistic');
const audioStart = new Audio(); audioStart.src = './sounds/start.wav';
const audioFinish = new Audio(); audioFinish.src = './sounds/finish.wav';
const audioCorrect = new Audio(); audioCorrect.src = './sounds/correct.wav';
const audioWrong = new Audio(); audioWrong.src = './sounds/wrong.wav';
const win = document.querySelector('.win');

win.style.display = "none";
// const audioStart = new Audio();  audioStart.src = './sounds/start.wav';

let steps = 0;
let turn = 0;
let second = 0;
let minute = 0;
let hour = 0;
// duration.innerHTML = `<b>Time:</b> ${hour} hour ${minute} min ${second} sec <br> <b>Steps</b>: ${turn}`;
duration.innerHTML = `<b>Time:</b> ${minute} min ${second} sec <br> <b>Steps</b>: ${turn}`;
const timer = function () {
    const time = setInterval(() => {
        second++;
        if (second == 60) {
            minute++;
            second = 0;
            if (minute == 60) {
                hour++;
                minute = 0;
            }
        }
        // duration.innerHTML = `<b>Time:</b> ${hour} hour ${minute} min ${second} sec <br> <b>Steps</b>: ${turn}`;
        duration.innerHTML = `<b>Time:</b> ${minute} min ${second} sec <br> <b>Steps</b>: ${turn}`;
    }, 1000);
}


cardGame.style.display = "none";
duration.style.display = "none";
startGame.addEventListener('click', (e) => {
    e.target.style.display = "none";
    cardGame.style.display = "flex";
    duration.style.display = "block";
    audioStart.play();
    timer();
})

// Create random numbers
const getRandomNumbers = function (number, length = 1) {
    return Math.floor(Math.random() * number) + length;
}

// Checker
const checker = function (firstClass, secondClass) {
    return firstClass === secondClass;
}


// Create unique numbers
const array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
const newArray = [];
for (let i = 0; i < 12; i++) {                    // array.length yazarken her defesinde arrayin icindeki elementi sildiyi ucun uzunluq ferqli olur, Mecburen 8 yazdim
    let random = getRandomNumbers(array.length, 0);
    newArray[i] = array[random];
    array.splice(random, 1);
}

let hasFlippedCard = false;
let firstCard;
let secondCard;
// Arrayin uzunluqu qeder card yaratmaq
for (let i = 0; i < cards.length; i++) {
    let picture = document.createElement('img');
    picture.className = `cardNumber${newArray[i]}`
    picture.setAttribute('src', `./cards/card${newArray[i]}.png`);
    front[i].appendChild(picture);
    cards[i].addEventListener('click', () => {
        cards[i].classList.add('rotateY');
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = cards[i];
        } else {
            hasFlippedCard = false;
            secondCard = cards[i];


            if (firstCard.children[0].children[0].className === secondCard.children[0].children[0].className) {
                turn++;
                setTimeout(() => {
                    firstCard.parentElement.classList.add('disappear');
                    secondCard.parentElement.classList.add('disappear');
                    steps++;
                    if(steps === 6){
                        cardGame.style.display = "none";
                        duration.style.display = "none";
                        win.style.display = "block";
                        audioFinish.play();
                        win.innerHTML = `You Win!🎉 </br> <b>Time:</b> ${hour} hour ${minute} min ${second} sec </br> Steps: ${turn}`;
                    }
                    audioCorrect.play();
                }, 1200);
            } else {
                turn++;
                setTimeout(() => {
                    firstCard.classList.remove('rotateY');
                    secondCard.classList.remove('rotateY');
                    audioWrong.play();
                }, 1200);
            }
        }
    })
}

