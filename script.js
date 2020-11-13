(function () {
    var currentPlayer = 'Player-1';
    var cols = $('.column');
    var slots = $('.slot');
    var followBox = $('.box-follow');
    var player1Score = $('#player1-score');
    var player2Score = $('#player2-score');
    var score1;
    var score2;

    $(document).on('click', function () {
        if (currentPlayer == 'Player-1') {
            followBox.css("background", "red");
        }
        if (currentPlayer == 'Player-2') {
            followBox.css("background", "blue");
        }
    });

    cols.on('click', function (e) {
        var col = $(e.currentTarget);
        var slotsInCol = col.children();

        for (var i = 5; i >= 0; i--) {
            if (!slotsInCol.eq(i).hasClass('Player-1') && !slotsInCol.eq(i).hasClass('Player-2')) {
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }
        // CHECK FOR VICTORY
        var slotsInRow = $('.row' + i);

        if (checkForVictory(slotsInCol)) {
            victoryDance();
        } else if (checkForVictory(slotsInRow)) {
            victoryDance();
        } else if (diagonalVictory()) {
            victoryDance();
        } else {
            switchPlayer();
        }
    });

    function checkForVictory(slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count >= 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    function diagonalVictory() {
        var counter = 0;
        var vic = [
            [slots.eq(8), slots.eq(15), slots.eq(22), slots.eq(29)],
            [slots.eq(1), slots.eq(8), slots.eq(15), slots.eq(22)],
            [slots.eq(2), slots.eq(9), slots.eq(16), slots.eq(23)],
            [slots.eq(0), slots.eq(7), slots.eq(14), slots.eq(21)],
            [slots.eq(7), slots.eq(14), slots.eq(21), slots.eq(28)],
            [slots.eq(14), slots.eq(21), slots.eq(28), slots.eq(35)],
            [slots.eq(6), slots.eq(13), slots.eq(20), slots.eq(27)],
            [slots.eq(13), slots.eq(20), slots.eq(27), slots.eq(34)],
            [slots.eq(20), slots.eq(27), slots.eq(34), slots.eq(41)],
            [slots.eq(12), slots.eq(19), slots.eq(26), slots.eq(33)],
            [slots.eq(19), slots.eq(26), slots.eq(33), slots.eq(40)],
            [slots.eq(18), slots.eq(25), slots.eq(32), slots.eq(39)],
            [slots.eq(3), slots.eq(8), slots.eq(13), slots.eq(18)],
            [slots.eq(4), slots.eq(9), slots.eq(14), slots.eq(19)],
            [slots.eq(9), slots.eq(14), slots.eq(19), slots.eq(24)],
            [slots.eq(5), slots.eq(10), slots.eq(15), slots.eq(20)],
            [slots.eq(10), slots.eq(15), slots.eq(20), slots.eq(25)],
            [slots.eq(15), slots.eq(20), slots.eq(25), slots.eq(30)],
            [slots.eq(11), slots.eq(16), slots.eq(21), slots.eq(26)],
            [slots.eq(16), slots.eq(21), slots.eq(26), slots.eq(31)],
            [slots.eq(21), slots.eq(26), slots.eq(31), slots.eq(36)],
            [slots.eq(17), slots.eq(22), slots.eq(27), slots.eq(32)],
            [slots.eq(22), slots.eq(27), slots.eq(32), slots.eq(37)],
            [slots.eq(23), slots.eq(28), slots.eq(33), slots.eq(38)]
        ];
        for (var ii = 0; ii < vic.length; ii++) {
            counter = 0;
            for (var j = 0; j < vic[ii].length; j++) {
                if (vic[ii][j].hasClass(currentPlayer)) { //
                    counter++;
                    if (counter >= 4) {
                        return true;
                    }
                } else {
                    counter = 0;
                }
            }
        }
    }

    if (!localStorage.getItem('previousScoreOne') && !localStorage.getItem('previousSciforeTwo')) {
        var count1 = localStorage.setItem('previousScoreOne', 0);
        var count2 = localStorage.setItem('previousScoreTwo', 0);
    }

    count1 = localStorage.getItem('previousScoreOne');
    count2 = localStorage.getItem('previousScoreTwo');

    function victoryDance() {

        var colorRed = 0;
        var colorBlue = 0;
        if (currentPlayer == 'Player-1') {
            count1++;
            colorRed = 255;
            localStorage.setItem('previousScoreOne', count1);

        }
        if (currentPlayer == 'Player-2') {
            count2++;
            colorBlue = 255;
            localStorage.setItem('previousScoreTwo', count2);
        }

        $('.winner').css({
            'visibility': 'visible',
            'background': 'rgba(' + colorRed + ', 0, ' + colorBlue + ', .50)'
        });

        $('.winning-msg').html('<h1>' + currentPlayer + '  Wins!</h1>');

        $('.play-button').click(function () {
            location.reload();
        });
    }

    function switchPlayer() {
        if (currentPlayer == 'Player-1') {
            currentPlayer = 'Player-2';
        } else {
            currentPlayer = 'Player-1';
        }
    }


    score1 = localStorage.getItem('previousScoreOne', count1);
    score2 = localStorage.getItem('previousScoreTwo', count2);
    player1Score.html('<p>' + score1 + '</p>');
    player2Score.html('<p>' + score2 + '</p>');

    $('#reset-button').on('click', function () {
        localStorage.setItem('previousScoreOne', 0);
        localStorage.setItem('previousScoreTwo', 0);
        location.reload();
    });
})();