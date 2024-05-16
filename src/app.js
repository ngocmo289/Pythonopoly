const gameboard = document.querySelector("#gameboard");
const container = document.querySelector("#container");
const playerDisplay = document.querySelector("#player");
const playButton = document.querySelector("#playButton");
const rule = document.querySelector("#rule");
const replay = document.querySelector("#replay");
const sound = document.querySelector("#sound");
const popup = document.getElementById('popup');
const closeButton = document.getElementById('closeButton');
const alertDiv = document.querySelector('.alert');
// Lấy tham chiếu đến các phần tử DOM cần ẩn
const frameElement = document.getElementById('frame');
const choosePlayerText = document.querySelector('.waviy');
const DiceDiv = document.querySelector('.totaldice');
const width = 11; // Số lượng ô chiều dài
const height = 6; // Số lượng ô chiều rộng
const player1 = 'url(\'../img/pl1.png\')';
const player2 = 'url(\'../img/pl2.png\')';
const player3 = 'url(\'../img/pl3.png\')';
const player4 = 'url(\'../img/pl4.png\')';
const Ostart = 'url(\'../img/start.png\')';
const Ostudy = 'url(\'../img/o.png\')';

// Lấy tham chiếu đến button "Roll The Dice"
const rollButton = document.querySelector(".btn");

let audio_bgr = new Audio('../img/bgr_sound.mp3');
// Gọi hàm phát âm thanh khi trang web đã được tải hoàn tất
window.addEventListener('load', function () {
    audio_bgr.play(); // Phát âm thanh nền
    // Lắng nghe sự kiện khi âm thanh kết thúc
    audio_bgr.addEventListener('ended', function () {
        // Chạy lại âm thanh từ đầu nếu kết thúc
        audio_bgr.currentTime = 0;
        audio_bgr.play();
    });
});


// Mảng để lưu trữ thông tin của các nhân vật được đặt tên
let namedCharacters = [];

function Player(name, image, stt) {
    this.name = name;
    this.image = image;
    this.stt = stt;
}


class Square {
    constructor(x, y, stt) {
        this.x = x;
        this.y = y;
        this.stt = stt;
    }
}

// 1: Hàm add()
// 2: Hàm subtract()
// 3: Hàm có chứa if()
// 4: Hàm có chứa while()
// 5: Hàm modulo()
// 6: Gọi hàm Giaithua ()(hàm giải giai thừa)
// trắc nghiệm, diền từ còn thiếu, sắp xếp

const quare = [];
quare[0] = new Square(0, 5, 0);
quare[1] = new Square(0, 4, 1);
quare[2] = new Square(0, 3, 2);
quare[3] = new Square(0, 2, 3);
quare[4] = new Square(0, 1, 4);
quare[5] = new Square(0, "", 5);
quare[6] = new Square(1, 0, 6);
quare[7] = new Square(2, 0, 7);
quare[8] = new Square(3, 0, 8);
quare[9] = new Square(4, 0, 9);
quare[10] = new Square(5, 0, 10);
quare[11] = new Square(6, 0, 11);
quare[12] = new Square(7, 0, 12);
quare[13] = new Square(8, 0, 13);
quare[14] = new Square(9, 0, 14);
quare[15] = new Square(10, 0, 15);
quare[16] = new Square(10, 1, 16);
quare[17] = new Square(10, 2, 17);
quare[18] = new Square(10, 3, 18);
quare[19] = new Square(10, 4, 19);
quare[20] = new Square(10, 5, 20);
quare[21] = new Square(9, 5, 21);
quare[22] = new Square(8, 5, 22);
quare[23] = new Square(7, 5, 23);
quare[24] = new Square(6, 5, 24);
quare[25] = new Square(5, "", 25);
quare[26] = new Square(4, 5, 26);
quare[27] = new Square(3, 5, 27);
quare[28] = new Square(2, 5, 28);
quare[29] = new Square(1, 5, 29);


function createBoard() {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const square = document.createElement("div");
            square.classList.add("square", `${x}`, `${y}`);
            gameboard.appendChild(square);

            const newSquare = new Square(x, y);
            square.squareData = newSquare; // Gắn đối tượng Square vào ô square
            // Thêm sự kiện click để hiển thị thông tin vị trí khi click vào ô
            // square.addEventListener("click", function () {
            //     addAlert(`Vị trí: (${newSquare.x}, ${newSquare.y})`);
            // });

            if (y == 0 || y == height - 1 || x == 0 || x == width - 1) {
                if (y == height - 1 && x == 0) {
                    square.style.backgroundImage = Ostart;
                } else {
                    square.style.backgroundImage = Ostudy;
                }
            }
        }
    }
    DiceDiv.style.display = "block";
}

function addAlert(textContent) {
    // Hiển thị thông báo nếu không đủ số lượng nhân vật
    alertDiv.textContent = textContent;
    alertDiv.style.display = 'block'; // Hiển thị div alert
    alertDiv.style.backgroundColor = "red";


    // Thiết lập hẹn giờ để ẩn div alert sau 1 giây
    setTimeout(function () {
        alertDiv.style.display = 'none'; // Ẩn div alert
    }, 2000);
}


function addRightAlert(textContent) {
    // Hiển thị thông báo nếu không đủ số lượng nhân vật
    alertDiv.textContent = textContent;
    alertDiv.style.display = 'block'; // Hiển thị div alert
    alertDiv.style.backgroundColor = "green";

    // Thiết lập hẹn giờ để ẩn div alert sau 1 giây
    setTimeout(function () {
        alertDiv.style.display = 'none'; // Ẩn div alert
    }, 2000);
}


// Bắt sự kiện click vào nút "play"
playButton.addEventListener("click", function () {
    // Lấy tất cả các input trong các phần tử .NV
    const inputs = document.querySelectorAll('.NV input');

    // Đếm số lượng nhân vật đã được đặt tên (đã nhập nội dung) trong các input
    namedCharacters = [];
    inputs.forEach(input => {
        const characterName = input.value.trim();
        if (characterName !== '') {
            // Lưu thông tin nhân vật vào mảng namedCharacters
            const characterImage = input.parentNode.querySelector('.detailNV').style.backgroundImage;
            const player = new Player(characterName, characterImage, 0);
            namedCharacters.push(player);
        }
    });

    // Kiểm tra số lượng nhân vật đã được đặt tên
    if (namedCharacters.length < 2) {
        // Hiển thị thông báo nếu không đủ số lượng nhân vật
        addAlert('Vui lòng chọn ít nhất 2 nhân vật để tiếp tục trò chơi !');

        // In thông tin về các nhân vật đã được đặt tên vào console
        namedCharacters.forEach(character => {
            console.log('Character Name:', character.name);
            console.log('Character Image:', character.image);
        });
    } else {
        gameboard.style.display = 'flex';
        createBoard(); // Gọi hàm tạo board khi có ít nhất 2 nhân vật được đặt tên
        // Sau khi tạo board thành công, ẩn các phần tử không cần thiết

        frameElement.style.display = 'none'; // Ẩn khung chọn nhân vật
        choosePlayerText.style.display = 'none'; // Ẩn chữ "CHOOSE PLAYER"
        playButton.style.display = 'none'; // Ẩn nút "PLAY"
        setup();
        // To start the game, call play() with the initial currentPlayerIndex
        play();
    }

});


function settextpopup(text) {
    popup.style.display = "block"; // Hiển thị popup
    var popupContent = document.querySelector('.popup-content p'); // Lấy phần tử <p> bên trong popup-content
    popupContent.innerHTML = text; // Sử dụng innerHTML để giữ lại cấu trúc HTML và xuống hàng
}

rule.addEventListener("click", function () {
    var text = "<p>Trò chơi này giúp bạn học về ngôn ngữ lập trình Python. <br><br>Mọi người đứng ở ô bắt đầu và quay xúc xắc để di chuyển. <br>Trước mỗi lần di chuyển, bạn phải trả lời một câu hỏi về Python. <br>Nếu trả lời sai, bạn mất lượt và phải chờ lượt tiếp theo. Nếu trả lời đúng, bạn được quay xúc xắc và tiếp tục di chuyển. <br><br>Lưu ý: Ở ô đầu tiên, bạn được quay mà không cần trả lời câu hỏi. <br><br>Chúc các bạn học tập vui vẻ !</p>";
    settextpopup(text);
});


closeButton.addEventListener("click", function () {
    popup.style.display = 'none';
});

replay.addEventListener("click", function () {
    // Hiển thị hộp thoại xác nhận
    var confirmed = confirm("Bạn có chắc chắn muốn bắt đầu lại trò chơi không?");

    // Nếu người chơi xác nhận (OK)
    if (confirmed) {
        location.reload(); // Tải lại trang
    } else {
        // Nếu người chơi hủy (Cancel), không làm gì cả hoặc thực hiện các hành động khác nếu cần
        // Ví dụ: Hiển thị thông báo hoặc không thực hiện hành động gì cả
    }
});

// Tạo một biến flag để theo dõi trạng thái của âm thanh
let isMuted = false;

sound.addEventListener("click", function () {
    if (isMuted) {
        // Nếu đang mute, đổi background image thành hình ảnh volume.png
        sound.style.backgroundImage = 'url(../img/mute.png)';
        isMuted = false; // Đánh dấu là không mute nữa
        if (audio_bgr) {
            // Nếu có âm thanh đang phát, ngừng phát
            audio_bgr.pause();
        }
    } else {
        // Nếu không mute, đổi background image thành hình ảnh mute.png
        sound.style.backgroundImage = 'url(../img/volume.png)';
        isMuted = true; // Đánh dấu là đang mute
        // Tạo một đối tượng âm thanh mới
        // Chạy âm thanh
        audio_bgr.play();
        // Lắng nghe sự kiện khi âm thanh kết thúc
        audio_bgr.addEventListener('ended', function () {
            // Chạy lại âm thanh từ đầu nếu kết thúc
            audio_bgr.currentTime = 0;
            audio_bgr.play();
        });
    }
});


// Lắng nghe sự kiện input
const inputs = document.querySelectorAll('.NV input');
inputs.forEach(input => {
    input.addEventListener('input', handleInput);
});

function handleInput() {
    var input = document.getElementById('fname');
    var detailNV = document.querySelector('.detailNV');

    // Kiểm tra nội dung của input
    if (input.value.trim() !== '') {
        detailNV.classList.add('brighten'); // Thêm lớp để làm sáng hình ảnh
    } else {
        detailNV.classList.remove('brighten'); // Xóa lớp để làm tối hình ảnh
    }
}

// Hàm xử lý sự kiện khi người dùng nhập vào các input
function handleInput(event) {
    const input = event.target; // Lấy phần tử input được kích hoạt
    const detailNV = input.parentNode.querySelector('.detailNV');
    // Kiểm tra nội dung của input
    if (input.value.trim() !== '') {
        detailNV.classList.add('brighten'); // Thêm lớp để làm sáng hình ảnh
    } else {
        detailNV.classList.remove('brighten'); // Xóa lớp để làm tối hình ảnh
    }
}


function getSquareElementByCoordinates(x, y) {
    // Lấy tất cả các phần tử có lớp là "square"
    const squares = document.getElementsByClassName("square");

    // Duyệt qua từng phần tử "square"
    for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
        // Tách lớp của phần tử square thành một mảng các chuỗi
        const classes = square.className.split(" ");
        // Kiểm tra xem giá trị `x` tồn tại trong lớp của square
        if (classes.includes(`${x}`)) {
            // Kiểm tra nếu giá trị `y` không tồn tại hoặc lớp của square chính xác
            if (!y || square.className === `square ${x} ${y}`) {
                return square;
            }
        }
    }

    // Nếu không tìm thấy, trả về null
    return null;
}

function setup() {
    var playerContainer = getSquareElementByCoordinates(quare[0].x, quare[0].y);
    // Xóa nội dung cũ của playerContainer trước khi thêm mới
    playerContainer.innerHTML = '';

    pcount = namedCharacters.length;
    // Duyệt qua mảng namedCharacters và tạo các phần tử div để hiển thị thông tin của mỗi người chơi
    namedCharacters.forEach(function (player) {
        // Tạo phần tử div để chứa thông tin của người chơi
        player.stt = quare[0].stt;
        var playerDiv = document.createElement('div');
        playerDiv.classList.add('player-info');
        if (pcount == 2) {
            playerDiv.style.width = '72.5px';
            playerDiv.style.height = '145px';
        } else {
            playerDiv.style.width = '72.5px';
            playerDiv.style.height = '72.5px';
        }
        // Tạo phần tử hình ảnh để hiển thị hình ảnh của người chơi
        var playerImage = document.createElement('div');
        playerImage.classList.add('player-image');


        playerImage.style.backgroundImage = player.image;

        // Tạo phần tử span để hiển thị tên của người chơi
        var playerName = document.createElement('span');
        playerName.textContent = player.name;

        // Thêm hình ảnh và tên của người chơi vào phần tử div chứa thông tin của người chơi
        playerDiv.appendChild(playerImage);
        playerDiv.appendChild(playerName);

        // Thêm phần tử chứa thông tin của người chơi vào playerContainer
        playerContainer.appendChild(playerDiv);
    });
}

function removePlayerFromSquare(quare, playerToRemove) {
    var playerContainer = getSquareElementByCoordinates(quare.x, quare.y);
    var playerDivs = playerContainer.querySelectorAll('.player-info');
    playerDivs.forEach(function (playerDiv) {
        if (playerDiv.textContent === playerToRemove.name) {
            playerDiv.parentNode.removeChild(playerDiv);
        }
    });
}

function updatePosition(count) {
    var currentPlayer = namedCharacters[currentPlayerIndex];
    console.log("count: " + count + "currrent: " + currentPlayerIndex);
    var new_stt = currentPlayer.stt + count;
    if (new_stt < quare.length) {
        var playerDiv = document.createElement('div');
        playerDiv.classList.add('player-info');
        var playerImage = document.createElement('div');
        playerImage.classList.add('player-image');
        playerImage.style.backgroundImage = currentPlayer.image;
        var playerName = document.createElement('span');
        playerName.textContent = currentPlayer.name;
        playerDiv.appendChild(playerImage);
        playerDiv.appendChild(playerName);
        var newSquare = quare[new_stt];
        var newSquareElement = getSquareElementByCoordinates(newSquare.x, newSquare.y);
        if (newSquareElement) {
            newSquareElement.appendChild(playerDiv);
            currentPlayer.stt = new_stt;
        } else {
            console.log("Không tìm thấy phần tử ô mới!");
        }

        // Kiểm tra số lượng nhân vật trên ô mới và áp dụng kích thước tương ứng cho hình ảnh
        checkPlayerCount(newSquareElement);
    } else {
        console.log("Người chơi đã hoàn thành trò chơi!");
    }
}

function checkPlayerCount(squareElement) {
    var playerDivs = squareElement.getElementsByClassName('player-info');
    var playerCount = playerDivs.length;

    for (var i = 0; i < playerDivs.length; i++) {
        var playerDiv = playerDivs[i];

        if (playerCount == 1) {
            playerDiv.style.width = '95px';
            playerDiv.style.height = '145px';
        }
        else if (playerCount == 2) {
            playerDiv.style.width = '72.5px';
            playerDiv.style.height = '145px';
        } else {
            playerDiv.style.width = '72.5px';
            playerDiv.style.height = '72.5px';
        }
    }
}

let currentPlayerIndex = 0;
let result = document.querySelector('h1');
let isDiceRolling = false;
// let isQuestionAnswered = false;


// Event listener cho nút "Roll Dice"
rollButton.addEventListener("click", function(){
    if(namedCharacters[currentPlayerIndex].stt == 0 ){
        rollTheDice();
    }else{
        loadQuestion();
    }
});

function play() {
    let currentPlayer = namedCharacters[currentPlayerIndex];
    result.innerHTML = (currentPlayer.name + "'s TURN");
}

function rollTheDice() {
    let currentPlayer = namedCharacters[currentPlayerIndex];
    if (!isDiceRolling) {
        // Quay xúc xắc
        isDiceRolling = true;
        let diceNum1 = document.querySelector(".img1");
        let diceNum2 = document.querySelector(".img2");

        diceNum1.setAttribute("src", "../img/diceroll.gif");
        diceNum2.setAttribute("src", "../img/diceroll.gif");
        diceNum1.style.transform = "scale(2.5)";
        diceNum2.style.transform = "scale(2.5)";

        setTimeout(() => {
            let randomNumber1 = Math.floor(Math.random() * 6) + 1;
            let randomNumber2 = Math.floor(Math.random() * 6) + 1;

            diceNum1.setAttribute('src', '../img/dice' + randomNumber1 + '.png');
            diceNum2.setAttribute('src', '../img/dice' + randomNumber2 + '.png');

            diceNum1.style.transform = "scale(1)";
            diceNum2.style.transform = "scale(1)";

            if (randomNumber1 === randomNumber2) {
                isQuestionAnswered = false; // Reset isQuestionAnswered to false
                var number = namedCharacters[currentPlayerIndex].stt;
                removePlayerFromSquare(quare[number], namedCharacters[currentPlayerIndex]);
                updatePosition(randomNumber1 + randomNumber2);
                result.innerHTML = (currentPlayer.name + "'s CONTINUE");
            } else {
                isQuestionAnswered = false; // Reset isQuestionAnswered to false
                var number = namedCharacters[currentPlayerIndex].stt;
                removePlayerFromSquare(quare[number], namedCharacters[currentPlayerIndex]);
                updatePosition(randomNumber1 + randomNumber2);
                currentPlayerIndex++;
                if (currentPlayerIndex >= namedCharacters.length) {
                    currentPlayerIndex = 0;
                }
                result.innerHTML = (namedCharacters[currentPlayerIndex].name + "'s TURN");
            }
            isDiceRolling = false;
        }, 2500);
    }
}


let wrapper = document.getElementsByClassName('wrapper')[0];
const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
const _checkBtn = document.getElementById('check-answer');
const _result = document.getElementById('result');

let correctAnswer = "";

/// Display the question and options
function showQuestion(data) {
    wrapper.style.display = 'block';
    _checkBtn.disabled = false;
    correctAnswer = data.slice(-1)[0].replace(/<br>/g, ''); // Thêm dòng này để xử lý <br>
    let incorrectAnswers = data.slice(1, -1); // Extract the first four elements as incorrect answers
    //console.log(incorrectAnswers)
    let optionsList = shuffleArray([...incorrectAnswers, data.slice(-1)[0]]); // Shuffle the options

    // Check if the first element of the data array is an image path
    if (data[0].startsWith('../img/')) {
        // Create an image element and append it to the _question element
        let questionImage = document.createElement('img');
        questionImage.src = data[0]; // Set the image source from the first element of the data array
        questionImage.alt = 'Question Image';
        _question.innerHTML = '';
        _question.appendChild(questionImage);
    } else {
        // Display the question text
        _question.innerHTML = `${data[0]} <br>`;
    }

    _options.innerHTML = optionsList.map((option, index) => `
        <li> <span>${option}</span></li>
    `).join('');

    selectOption();
}

// Shuffle the array of options
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Select an option
function selectOption() {
    _options.querySelectorAll('li').forEach(option => {
        option.addEventListener('click', () => {
            if (_options.querySelector('.selected')) {
                _options.querySelector('.selected').classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

function checkAnswer() {
    _checkBtn.disabled = true;
    if (_options.querySelector('.selected')) {
        let selectedAnswer = _options.querySelector('.selected span').textContent.trim(); // Loại bỏ khoảng trắng hai đầu
        if (selectedAnswer === correctAnswer.trim()) { // Loại bỏ khoảng trắng hai đầu của correctAnswer
            _result.innerHTML = `<p style="color: green;"><i class="fas fa-check"></i>Correct Answer!</p>`;
            result.innerHTML = "Correct answer! It's " + namedCharacters[currentPlayerIndex].name + "'s turn.";
            rollTheDice();
        } else {
            _result.innerHTML = `<p  style="color: red;"><i class="fas fa-times"></i>Incorrect Answer!</p>`;
            currentPlayerIndex++;
            if (currentPlayerIndex >= namedCharacters.length) {
                currentPlayerIndex = 0;
            }
            result.innerHTML = ( "Wrong answer! It's " + namedCharacters[currentPlayerIndex].name + "'s TURN");
        }
        setTimeout(() => {
            wrapper.style.display = 'none'
            _result.innerHTML = ''; // Reset the content of _result
        }, 800);            
    } else {
        _result.innerHTML = `<p><i class="fas fa-question"></i>Please select an option!</p>`;
        _checkBtn.disabled = false;
    }
}

// Array of question data
const questionData = [
    ["Kết quả của biểu thức operator.add(3, 5) là gì?", "35", "16", "lỗi", "8"],
    ["../img/while0.png", "1", "3", "4", "5"],
    ["Hàm add() trong Python thuộc về module nào?", "math", "itertools", "collections", "operator"],
    ["Hàm add() trong module operator có chức năng gì?", "Thêm một phần tử vào một danh sách", "Thêm một phần tử vào một tập hợp", "Thêm một giá trị vào một từ điển", "Cộng hai số lại với nhau"],
    ["Hàm add() có thể dùng với các loại dữ liệu nào sau đây?", "Số nguyên và số thực", "Chuỗi", "Danh sách", "Tất cả các loại trên"],
    ["Kết quả của biểu thức operator.add(\"hello\", \"world\") là gì?", "hello world", "None of the above", "Lỗi", "helloworld"],
    ["Kết quả của biểu thức operator.add([1, 2], [3, 4]) là gì?", "None of the above", "Lỗi", " [1, 2, [3, 4]]", "[1, 2, 3, 4]"],
    ["Kết quả của biểu thức operator.add((1, 2), (3, 4)) là gì?", "((1, 2), (3, 4))", " Lỗi", "None of the above", " (1, 2, 3, 4)"],
    ["Kết quả của biểu thức operator.add({\"a\": 1}, {\"b\": 2}) là gì?", " {\"a\": 1, \"b\": 2}", " {\"a\": 1}", "{\"b\": 2}", "Lỗi"],
    ["Điều gì sẽ xảy ra nếu gọi operator.add(5, \"test\")?", "5test", " None of the above", "test5", " Lỗi TypeError"],
    ["Kết quả của biểu thức operator.sub(-3, -7) là gì?", " -10", "10", "-4", "4"],
    ["Kết quả của biểu thức operator.sub(0, 5) là gì?", "5", "0", "lỗi", "-5"],
    ["Điều gì sẽ xảy ra nếu gọi operator.sub(\"hello\", \"world\")?", "helloworld", "hello world", "None of the above", "Lỗi TypeError"],
    ["Kết quả của biểu thức operator.sub(15, 20) là gì?", "35", "5", "lỗi", "-5"],
    ["Kết quả của biểu thức operator.sub(7.5, 2.5) là gì?", "10.0", "-5.0", "lỗi", "5.0"],
    ["Hàm subtract() có thể dùng với các loại dữ liệu nào sau đây?", "Chuỗi", "Danh sách", "Tất cả các loại trên", "Số nguyên và số thực"],
    ["Kết quả của biểu thức operator.sub(10, 3) là gì?", "13", "-7", "lỗi", "7"],
    ["Hàm subtract() trong module operator có chức năng gì?", "Trừ một phần tử ra khỏi một danh sách", "Trừ một phần tử ra khỏi một tập hợp", "Trừ một giá trị ra khỏi một từ điển", "Trừ hai số"],
    ["Câu lệnh if trong Python dùng để làm gì?", "Lặp qua các phần tử trong một danh sách", "Định nghĩa một hàm", " Nhập dữ liệu từ người dùng", "Thực hiện một hành động nếu điều kiện đúng"],
    ["Cú pháp đúng của một câu lệnh if trong Python là gì?", "if condition<br>do_something", " if (condition) {<br>do_something<br>}", "if (condition):<br>do_something", "if condition: <br>do_something"],
    ["../img/if0.png", "a is greater", "None", "Lỗi", "b is greater"],
    ["Điều gì sẽ xảy ra nếu không có lệnh else trong một hàm chứa if?", "Chương trình sẽ lỗi", "Chương trình sẽ bỏ qua các lệnh sau if", "Chương trình sẽ dừng", "Chương trình sẽ tiếp tục chạy bình thường"],
    ["../img/if1.png", "Positive", "Negative", "None of the above", "Zero"],
    ["../img/if2.png", "Even", "None", "Lỗi", "Odd"],
    ["../img/if3.png", "Even", "None", "Lỗi", "Odd"],
    ["../img/if4.png", "Positive", "None", "Lỗi", "Negative"],
    ["../img/if5.png", "Minor", "None", "Lỗi", "Adult"],
    ["Vòng lặp while trong Python dùng để làm gì?", "Lặp qua các phần tử trong một danh sách", "Định nghĩa một hàm", "Nhập dữ liệu từ người dùng", "Lặp lại một khối lệnh khi điều kiện còn đúng"],
    ["Cú pháp đúng của một vòng lặp while trong Python là gì?", " while (condition):<br>do_something", " while condition<br>do_something", " while (condition) {<br>do_something<br>}", "while condition:<br>do_something"],
    ["Điều gì sẽ xảy ra nếu điều kiện trong vòng lặp while luôn đúng?", " Vòng lặp sẽ chạy một lần", "Vòng lặp sẽ không chạy", " Chương trình sẽ lỗi", "Vòng lặp sẽ chạy vô hạn"],
    ["../img/while1.png", "Lỗi", "Blast off!", "3, 2, 1", "3, 2, 1, Blast off!"],
    ["../img/while2.png", "10", "0", "5", "15"],
    ["Điều gì sẽ xảy ra nếu không có điều kiện dừng trong vòng lặp while?", "Vòng lặp sẽ chạy một lần", " Vòng lặp sẽ không chạy", " Chương trình sẽ dừng ngay lập tức", "Vòng lặp sẽ chạy vô hạn"],
    ["../img/while3.png", "4", "10", "8", "24"],
    ["../img/while4.png", "0", "1", "Lỗi", "-1"],
    ["../img/while5.png", "[1, 3, 5, 7, 9]", "[2, 4, 6, 8, 10]", "[9, 7, 5, 3, 1]", "[10, 8, 6, 4, 2]"],
    ["../img/while6.png", "[1, 4, 9]", "[1, 4, 9, 0]", " [0, 1, 4, 9]", " [9, 4, 1]"],
    ["Phép toán modulo (%) trong Python dùng để làm gì?", " Chia hai số và trả về thương", " Tính lũy thừa của một số", " Tính căn bậc hai của một số", "Chia hai số và trả về phần dư"],
    ["Kết quả của biểu thức 10 % 3 là gì?", "2", "3", "0", "1"],
    ["Kết quả của biểu thức 15 % 4 là gì?", "1", "4", "0", "3"],
    ["Kết quả của biểu thức 7 % 7 là gì?", "7", "1", "14", "0"],
    ["../img/modulo0.png", "4", "10", "0", "2"],
    ["../img/modulo1.png", "False", "None", "Lỗi", "True"],
    ["Điều gì sẽ xảy ra nếu thực hiện phép toán 10 % 0?", " Trả về 10", " Trả về 0", "Trả về None", "Gây ra lỗi ZeroDivisionError"],
    ["../img/modulo2.png", "False", "None", "Lỗi", "True"],
    ["../img/modulo3.png", "9", "1", "0", "4"],
    ["../img/modulo4.png", "1", "-1", "-3", "3"],
    ["Kết quả của biểu thức 20 % 6 là gì?", "2", "6", "0", "4"],
    ["../img/modulo5.png", "3", "1", "0", "2"],
    ["Giai thừa của một số nguyên dương n (ký hiệu n!) là gì?", " Tổng các số từ 1 đến n", "Tích các số từ n đến 1", "Tích các số từ 0 đến n", " Tích các số từ 1 đến n"],
    ["Kết quả của 5! (5 giai thừa) là gì?", "24", "60", "100", "120"],
    ["../img/gt0.png", "10", "4", "1", "24"],
    ["../img/gt1.png", "0", "-1", "Lỗi", "1"],
    ["../img/gt2.png", "3", "9", "1", "6"],
    ["../img/gt3.png", "Lỗi vòng lặp vô hạn", " Lỗi giá trị trả về", " Lỗi cú pháp", " Không có lỗi"],
    ["../img/gt4.png", "5", "25", "720", "120"],
    ["../img/gt5.png", "360", "180", "60", "720"],
    ["../img/gt6.png", "1", "0", "-1", "Vòng lặp vô hạn"],
    ["../img/gt7.png", " Có thể xử lý mà không cần thay đổi", "Không thể xử lý, cần thay đổi logic của vòng lặp", "Không thể xử lý, cần thay đổi cấu trúc hàm", "Không thể xử lý, cần thêm kiểm tra n < 0"],
    ["../img/gt8.png", "3", "9", "1", "6"],
    ["../img/gt9.png", "Lỗi vòng lặp vô hạn", "Lỗi giá trị trả về", "Lỗi cú pháp", " Không có lỗi"],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],
    // ["", "", "", "", ""],

    // Add more question data here
];

// Load the question from the data
function loadQuestion() {
    // Randomly select a question from the questionData array
    const randomIndex = Math.floor(Math.random() * questionData.length);
    const selectedQuestionData = questionData[randomIndex];
    showQuestion(selectedQuestionData);
}

_checkBtn.addEventListener('click', checkAnswer);

