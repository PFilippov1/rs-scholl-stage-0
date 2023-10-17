'use strict';

const mario = document.getElementById('mario')
const princess = document.getElementById('princess')
const boser = document.getElementById('boser')
const startBtn = document.querySelector('.start')
const newGameBtn = document.querySelector('.new-game')
const recordScore = document.querySelector('.record__wrapper .value')
const recordTime = document.querySelector('.record__wrapper .time')
const rescueScore = document.querySelector('.rescue-score')
const playerTime = document.querySelector('.player-time')
const recordWrapper = document.querySelector('.record__wrapper')
const rescueScoreShow = document.querySelector('.record__wrapper .rescue-score')
const playerTimeShow = document.querySelector('.record__wrapper .player-time')




let saveCount = 0
let timePlay = ''
const modal = document.querySelector('.modal');
let result = {};



document.addEventListener('keydown', (event) => {
    jump()
})
//mario jump function
function jump() {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump')
    }

    setTimeout(() => {
        mario.classList.remove('jump')
    }, 700)

}

startGame()


function startGame() {
    startBtn.addEventListener('click', () => {
        princess.style.display = 'block';
        mario.style.display = 'block';
        boser.style.display = 'block';
        princess.style.animation = 'princessMov 2s infinite linear';
        boser.style.animation = 'boserMov 1.5s infinite linear';
        startBtn.style.display = 'none'
    })


}

function showModal() {
    modal.style.display = 'flex'
}
// show data format function
function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

function getTime() {
    const now = new Date();
    const formattedDate = formatDate(now);
    console.log(formattedDate);
    return formattedDate;
}
// ===============================

function endGame() {
    mario.style.display = 'none';
    princess.style.display = 'none';
    boser.style.display = 'none';
    startBtn.style.display = 'none';
    rescueScoreShow.style.display = 'block'
    playerTimeShow.style.display = 'block'
    recordWrapper.style.justifyContent = 'space-between'
    showModal()
    getTime()
    //add data to local storage 
    result['gamePlayTime'] = getTime()
    result['gameScore'] = saveCount
    putValuesIntoLastScore(result['gamePlayTime'], result['gameScore'])
    let existingResults = JSON.parse(localStorage.getItem('results')) || [];
    if (!Array.isArray(existingResults)) {
        existingResults = [];
    }
    existingResults.push(result);

    localStorage.setItem('results', JSON.stringify(existingResults));

}




let isFree = setInterval(() => {
    let marioPosition = parseInt(window.getComputedStyle(mario).getPropertyValue('bottom'))
    // console.log('mario ' + marioPosition)
    // let princessPosition = parseInt(window.getComputedStyle(princess).getPropertyValue('left'))
    let boserPosition = parseInt(window.getComputedStyle(boser).getPropertyValue('left'))
    // console.log('boser ' + boserPosition)
    if (boserPosition <= 100 && boserPosition > 0 && (marioPosition <= 90)) {
        console.log('catched')

        endGame()
        clearInterval(isFree)
    }
}, 100)

let isRescue = setInterval(() => {
    let marioPosition = parseInt(window.getComputedStyle(mario).getPropertyValue('bottom'));
    let princessPosition = parseInt(window.getComputedStyle(princess).getPropertyValue('left'));
    // console.log('princess ' + princessPosition)

    // (boserPosition <= 100 && boserPosition > 0 && (marioPosition <= 90))
    // (princessPosition <= 100 && princessPosition > 0 && marioPosition <= 100)
    if (princessPosition <= 100 && princessPosition > 0 && (marioPosition <= 100)) {
        princess.style.visibility = 'hidden';
        rescue.style.visibility = 'visible';
        // console.log('princess saved')

        savePrincessCount()

        setTimeout(() => {
            princess.style.visibility = 'visible';
            rescue.style.visibility = 'hidden';
        }, 250);
        // clearInterval(isRescue)
    }
}, 250)


function savePrincessCount() {
    if (saveCount !== undefined) {
        saveCount++;
        console.log('saveCount : ' + saveCount)
    }
    return saveCount
}


newGame()
function newGame() {
    newGameBtn.addEventListener('click', () => {
        window.location.reload();
    })

}
// ===========================

function putValuesIntoLastScore(time, score) {
    const modal = document.querySelector('.modal');
    const rescueScoreValue = modal.querySelector('.rescue-score .value');
    const playerTimeValue = modal.querySelector('.player-time .time');
    rescueScoreValue.textContent = score
    playerTimeValue.textContent = time
}

let resultsData = localStorage.getItem('results');

if (resultsData !== null && resultsData !== undefined && resultsData !== '') {
    try {
        resultsData = JSON.parse(resultsData);
        resultsData.sort((a, b) => -a.gameScore + b.gameScore);

        // top 10 best
        resultsData = resultsData.slice(0, 10);
        // console.log(resultsData)
        for (const i of resultsData) {
            // console.log(i.gamePlayTime)
            let time = document.createElement('div');
            time.textContent = i.gamePlayTime
            recordTime.append(time)
            // console.log(i.gameScore)
            let score = document.createElement('div');
            score.textContent = i.gameScore
            recordScore.appendChild(score)
        }


    } catch (error) {
        console.log(error)
    }
} else {
    resultsData = [];
}

console.log('ну очень простое приложение, как смог)): \n  прыжок любой кнопкой, есть учет статистики иногда не срабатывает princes save \n надо перегружать страницу. Проверял на разрешении 768 и 1980')



