const numDivs = 36;
const maxHits = 10;

let hits = 0;
let missHits = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  $(".game-field").removeClass("target");
  $(".game-field").html("");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером

  $(divSelector).html(hits + 1);
  console.log('hits', hits);

  console.log('firstHitTime', firstHitTime);

  if(hits === 0) {
    firstHitTime = getTimestamp();
  }

  // FIXME: тут надо определять при первом клике firstHitTime

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".game-field").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("total-miss").text(missHits);


  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  } else {
    missHits = missHits + 1;
    $(event.target).addClass("miss");
  }

  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  

  $(".game-field").click(handleClick);

  $("#button-start").click(function() {
    round();
  $("#button-start").hide();

  });

  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
