document.addEventListener('DOMContentLoaded', function(){
  var randomNubmer = Math.floor(Math.random() * 100) + 1;

  var guesses = document.querySelector('.guesses');
  var lastResult = document.querySelector('.lastResult');
  var lowOrHi = document.querySelector('.lowOrHi');
  var parent = document.querySelector('.s__game .container');
  var check = document.querySelector('.check');
  var resultParas = document.querySelector('.resultParas');
  var button = document.querySelector('.button');

  var luckSound = new Audio('sounds/Windows Ding.wav');
  var resetSound = new Audio('sounds/chimes.wav');
  var errorSound = new Audio('sounds/Windows Critical Stop.wav');


  var guessSubmit = document.querySelector('.guessSubmit');
  var guessField = document.querySelector('.guessField');

  var guessCount = 1
  var resetButton;

  function checkGuess() {
    var userGuess = Number(guessField.value);
    if (guessCount === 1) {
      guesses.textContent = 'Предыдущие числа: '
    }
    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNubmer) {
      luckSound.play();
      lastResult.textContent = 'Попытка завершилась успешно!';
      lastResult.style.backgroundColor = 'green';
      resultParas.classList.remove('hidden');
      resultParas.classList.add('active');
      check.classList.remove('hidden');
      check.classList.add('active');
      lowOrHi.textContent = '';
      setGameOver();
    } else if (guessCount === 10) {
      lastResult.textContent = 'Попытки исчерпаны';
      resultParas.classList.remove('hidden');
      resultParas.classList.add('active');
      button.classList.remove('hidden');
      button.classList.add('active');
      setGameOver();
    } else {
      errorSound.play();
      lastResult.textContent = 'Вы ошибллись';
      resultParas.classList.remove('hidden');
      resultParas.classList.add('active');
      lastResult.style.backgroundColor = 'red';
      if(userGuess < randomNubmer) {
        lowOrHi.textContent = 'Ваше последне число было меньше заданного';
      } else if(userGuess > randomNubmer) {
        lowOrHi.textContent = 'Ваше последне число было выше заданного';
      }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
  }

  guessSubmit.addEventListener('click', checkGuess);

  function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Повтор';
    resetButton.classList.add('button');
    resetButton.classList.add('button_reset');
    resetButton.classList.add('active');
    var child = parent.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
  }

  function resetGame() {
    resetSound.play();
    resultParas.classList.remove('active');
    resultParas.classList.add('hidden');
    resetButton.classList.remove('active');
    resetButton.classList.add('hidden');
    check.classList.remove('active');
    check.classList.add('hidden');
    guessCount = 1;

    function clearResult() {
      var resetParas = document.querySelectorAll('.resultParas p');
      for (var i = 0 ; i < resetParas.length ; i++) {
        resetParas[i].textContent = '';
      }

      resetButton.parentNode.removeChild(resetButton);

      guessField.disabled = false;
      guessSubmit.disabled = false;
      guessField.value = '';

      guessField.focus();

      lastResult.style.backgroundColor = '#242259';

      var randomNubmer = Math.floor(Math.random() * 100) + 1;
    }

    setTimeout(clearResult, 500);
  }
})
