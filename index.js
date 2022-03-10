import { Score } from "./score/score.js";
import { Game } from "./game.js";

document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById("game-area");
    const score = new Score(gameArea, "score-div");

    let tickSpeed = 15;

    let game = new Game(gameArea, score);
    document.getElementById("play-btn").onclick = () => game.play();
    document.getElementById("pause-btn").onclick = () => game.pause();
    document.getElementById("reset-btn").onclick = () => game.reset();
    game.ondeath = playDeathSound;

    setInterval(() => game.tick(), tickSpeed);

    function playDeathSound() {
        let audio = document.getElementById("death-audio");
        audio.volume = 0.5;
        audio.play();
    }
});
