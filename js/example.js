'use strict';

(function () {
  var X0 = 36;
  var Y0 = 87;
  var CPY1 = -60;
  var CPY2 = -20;
  var HALF_WIDTH_INPUT = 7;

  var firstNumber = document.querySelector('.number-1');
  var secondNumber = document.querySelector('.number-2');
  var thirdNumber = document.querySelector('.number-3');
  var firstImput = document.querySelector('.value-1');
  var example = document.querySelector('.example');
  var inputField = document.querySelector('.input-field');

  var randomFirstNumber = Math.floor(6 + 4 * Math.random());
  var randomSecondNumber = Math.floor(11 + 4 * Math.random()) - randomFirstNumber;
  var total = randomFirstNumber + randomSecondNumber;
  var x1 = (X0 + 39 * randomFirstNumber);
  var x2 = (x1 + 39 * randomSecondNumber);

  firstNumber.textContent = randomFirstNumber;
  secondNumber.textContent = randomSecondNumber;
  function draw(x0, y, x, cpy, randomNumber) {
    var canvas = document.querySelector('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      ctx.beginPath();
      ctx.moveTo(x0, y);
      ctx.quadraticCurveTo(x0 + (x - x0) / 2, cpy, x, y);
      ctx.strokeStyle = 'red';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo((x - randomNumber * 1.1), (y - (20 - randomNumber * 0.8)));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo((x - 13), y - (11 - randomNumber * 0.8));
      ctx.stroke();
    }
  }
  draw(X0, Y0, x1, CPY1, randomFirstNumber);

  firstImput.style.left = (X0 - HALF_WIDTH_INPUT + (x1 - X0) / 2) + 'px';

  function check(field, number, nameElement) {
    if (field.value !== number.textContent) {
      number.style.backgroundColor = '#FFCC00';
      field.style.color = 'red';
    } else {
      number.style.backgroundColor = 'white';
      field.style.color = 'black';
      nameElement.textContent = field.value;
      nameElement.style.color = 'black';
      nameElement.style.left = field.style.left;
      nameElement.style.top = field.style.top;
    }
  }

  firstImput.addEventListener('keyup', function () {
    var div = document.createElement('div');
    var input = document.createElement('input');
    check(firstImput, firstNumber, div);
    if (firstImput.value === firstNumber.textContent) {
      inputField.replaceChild(div, firstImput);
      inputField.appendChild(input);
      input.focus();
      input.style.left = (x1 - HALF_WIDTH_INPUT + (x2 - x1) / 2) + 'px';
      input.style.top = (CPY2 - CPY1 - 20) + 'px';
      draw(x1, Y0, x2, CPY2, randomSecondNumber);

      input.addEventListener('keyup', function () {
        var secondDiv = document.createElement('div');
        var inputExample = document.createElement('input');
        check(input, secondNumber, secondDiv);
        if (input.value === secondNumber.textContent) {
          inputField.replaceChild(secondDiv, input);
          example.replaceChild(inputExample, thirdNumber);
          inputExample.focus();
          inputExample.addEventListener('keyup', function () {
          if (inputExample.value !== String(total)) {
              inputExample.style.color = 'red';
          } else {
              var totalDiv = document.createElement('div');
              totalDiv.textContent = inputExample.value;
              totalDiv.style.color = 'black';
              example.replaceChild(totalDiv, inputExample);
          }
      });
        }
      });
    }
  });
}());
