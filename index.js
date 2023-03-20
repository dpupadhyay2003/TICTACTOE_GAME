let currentPlayer = "X";
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

var counter = 0;
var player1 = 0;
var player2 = 0;
var tie = 0;
var leaderboardName = [];


$(document).ready(function () {
    let player1Label = prompt('Enter Player 1 Name : ');
    let player2Label = prompt('Enter Player 2 Name : ');

    $('#player-1-score').html(player1Label);
    $('#player-2-score').html(player2Label);

});

function onMove(id) {
    if (!$('#rect' + id).text()) {
        if (counter < 10) {
            counter += 1;
            if (counter % 2 == 0) {
                //Player - 2 Turn
                // Print 'o'
                $('#rect' + id).html('o').addClass('o-value text-center');
                $('#player-2-score').removeClass('current-player-box');
                $('#player-1-score').addClass('current-player-box margin-left-32').removeClass('margin-left-35');
                $('#tie-score').addClass('margin-left-6').removeClass('margin-left-8');
            } else {
                //Player - 1 Turn
                // Print 'x'
                $('#rect' + id).html('x').addClass('x-value text-center');
                $('#player-2-score').addClass('current-player-box');
                $('#player-1-score').removeClass('current-player-box margin-left-32').addClass('margin-left-35');
                $('#tie-score').addClass('margin-left-8').removeClass('margin-left-6');
            }
        } else {
            //reset counter
            counter = 0;
        }
        gameCondition();
    }
}



function resetAllBoxes() { // Clear All Boxes, as one of the player wins or match gets TIE
    for (let index = 1; index <= 9; index++) {
        $('#rect' + index).html('');
    }
    counter = 0;
}

function updateScore(value) { // Check and Update the Score.       
    if (value == 'x') {
        // Player X Wins.
        player1 += 1;
        $('#player-1-value').html(player1)
        resetAllBoxes();
        leaderboardName.push($('#player-1-score').text());
        alert('Congratulations! ' + $('#player-1-score').text() + ' wins.');
    } else {
        // Player O Wins.
        player2 += 1;
        $('#player-2-value').html(player2)
        resetAllBoxes();
        leaderboardName.push($('#player-2-score').text());
        alert('Congratulations! ' + $('#player-2-score').text() + ' wins.');
    }
    updateLeaderboard();
}

function checkWinning(val1, val2, val3) { //checks whether the div's has same value['x', 'o'] or not
    if ((val1 === 'x' && val2 === 'x' && val3 === 'x') ||
        (val1 === 'o' && val2 === 'o' && val3 === 'o')) {
        return true;
    } else {
        return false;
    }
}


function gameCondition() {
    var div1 = $('#rect1').text();
    var div2 = $('#rect2').text();
    var div3 = $('#rect3').text();
    var div4 = $('#rect4').text();
    var div5 = $('#rect5').text();
    var div6 = $('#rect6').text();
    var div7 = $('#rect7').text();
    var div8 = $('#rect8').text();
    var div9 = $('#rect9').text();

    if (checkWinning(div1, div2, div3)) {
        updateScore(div1);
    } else if (checkWinning(div4, div5, div6)) {
        updateScore(div4);
    } else if (checkWinning(div7, div8, div9)) {
        updateScore(div7);
    } else if (checkWinning(div1, div4, div7)) {
        updateScore(div1);
    } else if (checkWinning(div2, div5, div8)) {
        updateScore(div2);
    } else if (checkWinning(div3, div6, div9)) {
        updateScore(div3);
    } else if (checkWinning(div1, div5, div9)) {
        updateScore(div1);
    } else if (checkWinning(div3, div5, div7)) {
        updateScore(div3);
    } else {
        // Match TIE.
        if (div1 != '' && div2 != '' && div3 != '' &&
            div4 != '' && div5 != '' && div6 != '' &&
            div7 != '' && div8 != '' && div9 != '' &&
            !checkWinning(div1, div2, div3) && !checkWinning(div4, div5, div6) && !checkWinning(div7, div8, div9) &&
            !checkWinning(div1, div4, div7) && !checkWinning(div2, div5, div8) && !checkWinning(div3, div6, div9) &&
            !checkWinning(div1, div5, div9) && !checkWinning(div3, div5, div7)) {
            tie += 1;
            $('#tie-value').html(tie);
            resetAllBoxes();
        }
    }
}


function resetScore() {
    counter = 0;
    player1 = 0;
    player2 = 0;
    tie = 0;
    $('#player-1-value').html(0);
    $('#player-2-value').html(0);
    $('#tie-value').html(0);
}

function resetLeaderBoard() {
    leaderboardName = [];
    $('#leaderboardValue').html('');
}


function updateLeaderboard() {

    $('#leaderboardValue').html('');

    const leaderboardEl = document.getElementById("leaderboardValue");

    console.log(leaderboardName);
    console.log(leaderboardName[0]);

    for (let i = 1; i <= leaderboardName.length; i++) {
        const pEl = document.createElement("p");
        pEl.textContent = i + ".  " + leaderboardName[i - 1];
        leaderboardEl.append(pEl);
    }

}