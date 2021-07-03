let score = 0;
const MAX_SCORE = 10;

function getSadInterval() {
    return Date.now() + 1000;
}

function getGoneInterval() {
    return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function getHungryInterval() {
    return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}

function getRoyalStatus() {
    return Math.random() > 0.9;
}

const moles = [{
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-0")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-1')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-2')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-3')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-4')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-5')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-6')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-7')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-8')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-9')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-10')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById('hole-11')
    }
];



function getNextStatus(mole) {
    console.log(mole.status)
    console.log(mole.next)
    switch (mole.status) {
        case "fed":
        case "sad":
            {
                mole.next = getSadInterval();
                mole.status = "leaving";
                if (mole.king) {
                    mole.node.children[0].src = "./assets/king-mole-leaving.png";
                } else {
                    mole.node.children[0].src = './assets/mole-leaving.png';
                }
                break;
            }

        case "leaving":
            {
                mole.next = getGoneInterval();
                mole.status = "gone";
                mole.node.children[0].classList.add("gone");
                break;
            }

        case "gone":
            {
                mole.status = "hungry";
                mole.king = getRoyalStatus();
                mole.next = getHungryInterval();
                mole.node.children[0].classList.add("hungry");
                mole.node.children[0].classList.remove("gone");
                if (mole.king) {
                    mole.node.children[0].src = "./assets/king-mole-hungry.png";
                } else {
                    mole.node.children[0].src = "./assets/mole-hungry.png";
                }

                break;
            }

        case "hungry":
            {
                mole.status = "sad";
                mole.next = getSadInterval();
                mole.node.children[0].classList.remove("hungry");
                if (mole.king) {
                    mole.node.children[0].src = "./assets/king-mole-sad.png";
                } else {
                    mole.node.children[0].src = './assets/mole-sad.png';
                }
                break;
            }
    }
}

function win() {
    document.querySelector('.bg').classList.add('hide');
    document.querySelector('.win').classList.remove('hide');
}

function feed(event) {
    if (event.target.tagName !== 'IMG' || !event.target.classList.contains('hungry')) { // To check if user clicked on mole
        return;
    }

    const mole = moles[parseInt(event.target.dataset.index)];
    mole.status = 'fed';
    mole.next = getSadInterval();
    if (mole.king) {
        score += 2;
        mole.node.children[0].src = "./assets/king-mole-fed.png";
    } else {
        score++;
        mole.node.children[0].src = './assets/mole-fed.png';
    }
    mole.node.children[0].classList.remove("hungry");

    if (score >= MAX_SCORE) {
        win();
    }

    document.querySelector(".worm-container").style.width = `${(score/MAX_SCORE)*100}%`;
    if (document.querySelector(".worm-container").style.width === "100%") {
        document.querySelector(".worm-container").style.visibility = 'hidden';
        document.querySelector(".score-meter").style.visibility = 'hidden';

    }
}


let runAgainAt = Date.now() + 100;

function nextFrame() {

    const now = Date.now();

    if (runAgainAt <= now) {
        for (let i = 0; i < moles.length; i++) {
            if (moles[i].next <= now) {
                getNextStatus(moles[i]);
            }
        }
        runAgainAt = now + 100;
    }
    requestAnimationFrame(nextFrame);
}

document.querySelector('.bg').addEventListener('click', feed);

nextFrame();