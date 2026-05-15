/* 👤 USERNAME */

let username =
localStorage.getItem("username") || "Guest";

/* 🔊 SOUNDS */

const jumpSound =
new Audio("../audio/jump.mp3");

const hitSound =
new Audio("../audio/hit.mp3");

const scoreSound =
new Audio("../audio/score.mp3");

/* 🔊 PLAY SOUND */

function playSound(sound){

    sound.currentTime = 0;

    sound.play();
}

/* 👤 CHANGE USERNAME */

function changeUsername(){

    let newName =
    prompt("Enter your username:");

    if(newName && newName.trim() !== ""){

        username = newName.trim();

        localStorage.setItem(
            "username",
            username
        );

        const currentUser =
        document.getElementById("currentUser");

        if(currentUser){

            currentUser.innerText =
            "👤 " + username;
        }
    }
}

/* 💾 SAVE SCORE */

function saveScore(game, score){

    let leaderboard =
    JSON.parse(
        localStorage.getItem("leaderboard")
    ) || [];

    leaderboard.push({

        name: username,

        game: game,

        score: score
    });

    /* SORT */

    leaderboard.sort(
        (a,b) => b.score - a.score
    );

    /* TOP 10 */

    leaderboard = leaderboard.slice(0,10);

    localStorage.setItem(
        "leaderboard",
        JSON.stringify(leaderboard)
    );

    showLeaderboard();
}

/* 🏆 SHOW LEADERBOARD */

function showLeaderboard(){

    const board =
    document.getElementById("leaderboard");

    if(!board) return;

    let leaderboard =
    JSON.parse(
        localStorage.getItem("leaderboard")
    ) || [];

    leaderboard.forEach((player,index)=>{

        board.innerHTML += `

        <div class="leader-card">

            <div>
                <strong>
                #${index + 1}
                </strong>
            </div>

            <div>
                👤 ${player.name}
            </div>

            <div>
                🎮 ${player.game}
            </div>

            <div>
                ⭐ ${player.score}
            </div>

        </div>
        `;
    });
}

/* 💀 GAME OVER */

function gameOver(game, score){

    playSound(hitSound);

    saveScore(game, score);

    alert(
        "Game Over 😭 Score: " + score
    );
}

/* 🚀 LOAD */

window.onload = () => {

    const currentUser =
    document.getElementById("currentUser");

    if(currentUser){

        currentUser.innerText =
        "👤 " + username;
    }

    showLeaderboard();
};