var height = 0;
var width = 0;
var vitality = 1;
var score = 0;
var time = 100;

var createGnatTime = 1500;

var level = window.location.search
level = level.replace('?', '')

if(level === 'easy') {
    // 1500ms
    createGnatTime = 1500;
} else if (level === 'medium') {
    // 1000ms
    createGnatTime = 1000;
} else if (level === 'hard') {
    // 750ms
    createGnatTime = 750;
}

function adjustSize() {
    height = window.innerHeight;
    width = window.innerWidth; 

    console.log(width, height)
}

adjustSize()

var timer = setInterval(function () {
    time -= 1

    if(time < 0) {
        clearInterval(timer)
        clearInterval(createGnat)
        window.location.href = 'win.html'
    } else {
        document.getElementById('timer').innerHTML = time
    }
}, 1000)

function randomPosition() {

    // remove the mosquito before creating a new one
    if (document.getElementById('gnat')) {
        document.getElementById('gnat').remove()
        if (vitality > 3) {
            window.location.href = 'game_over.html'
        } else {
            document.getElementById('v' + vitality).src = "images/empty_heart.png"
            vitality++;
        }
    }

    var positionX = Math.floor(Math.random() * width) - 90;
    var positionY = Math.floor(Math.random() * height) - 90;

    positionX = positionX < 0 ? 0 : positionX;
    positionY = positionY < 0 ? 0 : positionY;

    console.log(positionX, positionY)

    var gnat = document.createElement('img')
    gnat.src = 'images/gnat.png'
    gnat.className = generateSize() + ' ' + generateSide()
    gnat.style.left = positionX + 'px'
    gnat.style.top = positionY + 'px'
    gnat.style.position = 'absolute'
    gnat.id = 'gnat'
    gnat.onclick = function () {
        this.remove()
        score++
        console.log(score)
        document.getElementById('score').innerHTML = score
    }
    

    document.body.appendChild(gnat)
}

function generateSize(){
    var size = Math.floor(Math.random() * 3) + 1
    switch (size) {
        case 1:
            return 'gnat-sm'
        case 2:
            return 'gnat-md'
        case 3:
            return 'gnat-bg'
    }
}

function generateSide() {
    var side = Math.floor(Math.random() * 2)
    switch (side) {
        case 0:
            return 'left'
        case 1:
            return 'right'
    }
}
