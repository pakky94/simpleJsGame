import { ScoreOutput } from "./score/scoreOutput.js";
import { Game } from "./game.js";

document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById("game-area");
    const scoreOut = new ScoreOutput("score-div");

    let tickSpeed = 15;

    let game = new Game(gameArea, scoreOut);
    document.getElementById("play-btn").onclick = () => game.play();
    document.getElementById("pause-btn").onclick = () => game.pause();
    document.getElementById("reset-btn").onclick = () => game.reset();
    game.ondeath = () => document.getElementById("death-audio").play();

    game.state.onscoreupdated = score => scoreOut.updateScore(score);

    setInterval(() => game.tick(), tickSpeed);
});