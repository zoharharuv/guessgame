'use strict';
var gLastRes = null;

$(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);
$('.btn-reset-game').click(onRestartGame);

function init() {
  createQuestsTree();
}

function onStartGuessing() {
  $('.game-start').hide();
  $('.answer-buttons').show();
  renderQuest();
  $('.quest').show();
}

function renderQuest() {
  var currQuest = getCurrQuest();
  $('.quest').children('h2').html(currQuest.txt);
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.quest').children('h2').html('Yes, I knew it!');
      $('.answer-buttons').hide();
      $('.btn-reset-game').show();
    } else {
      $('.quest').children('h2').html('I dont know...teach me!');
      $('.quest').hide();
      $('.new-quest').show();
    }
  } else {
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  addGuess(newQuest, newGuess, gLastRes);
  $('#newGuess').val('');
  $('#newQuest').val('');
  onRestartGame();
}

function onRestartGame() {
  $('.quest').hide();
  $('.btn-reset-game').hide();
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
  init();
}
