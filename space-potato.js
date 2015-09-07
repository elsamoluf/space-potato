$(document).ready( function() {
  playRadio();
});

var spacecore = $("#spacecore");
var factcore = $("#factcore");
var textbox = $("#textbox");

var character;
var character_name;
var others;
var quote_queue;
var previous_quote;

var SPACE_QUOTES = $(".space audio");
var FACT_QUOTES = $(".fact audio");

function clone(array) {
  var cloned_quotes = $.extend(true, [], array);
  return cloned_quotes;
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function removeAQuote(array) {
  array.shift();
}

function playRadio() {
  var radio = document.getElementById("radio");
  radio.currentTime = 3.5;
  radio.volume = 0.1;
  // radio.play();
}

$(".char-img").click(function() {
  character = $(this);
  others = $(".char-img").not($(this));
  identifyCharacter(character);
  changeSelection();
  prepareQuotes();
});

function changeSelection() {
  others.removeClass("neutral");
  character.removeClass("neutral");

  others.addClass("unselected");
  character.removeClass("unselected");

  others.removeClass("selected");
  character.addClass("selected");

  alignTextbox();
}

function alignTextbox() {
  textbox.show();
  if (character_name == "spacecore") {
    textbox.css("left", "");
    textbox.css("right", "0");
  } else if (character_name == "factcore") {
    textbox.css("right", "");
    textbox.css("left", "0");
  }
}

function prepareQuotes() {
  var cloned_quotes;
  if (character_name == "spacecore") {
    cloned_quotes = clone(SPACE_QUOTES);
  } else if (character_name == "factcore") {
    cloned_quotes = clone(FACT_QUOTES);
  }
  quote_queue = shuffle(cloned_quotes);
  return quote_queue;
}

function identifyCharacter() {
  character_name = character[0].id;
}

function stopPrevQuote() {
  if (typeof last_quote !== "undefined") {
    last_quote.pause();
  }
}

function repopulateQuotesHuh() {
  if (quote_queue.length === 0) {
    prepareQuotes();
  }
}

function playQuote() {
  repopulateQuotesHuh();
  var quote = quote_queue[0];
  last_quote = quote;
  console.log(quote);
  removeAQuote(quote_queue);

  var words = findText(quote);
  appendText(words);

  quote.currentTime = 0;
  quote.play();
  console.log(quote_queue.length);
}

function findText(quote) {
  var quote_id = quote.id; // "space1"
  var text = AudioTextMap[quote_id]; // space1_text
  return text;
}

function appendText(words) {
  textbox.empty();
  for (i = 0; i < words.length; i++) {
    var line = $("<p>");
    line.append(words[i]);
    textbox.append(line);
  }
}

$(document).keypress(function() {
  stopPrevQuote();
  playQuote();
});



// QUOTE TEXT
var space1_text = [];
space1_text[0] = "Dad! I'm in space!";
space1_text[1] = "\"I'm proud of you, son.\"";
space1_text[2] = "Dad, are you space?";
space1_text[3] = "\"Yes. Now we are a family again.\"";

var space2_text = [];
space2_text[0] = "Orbit.";
space2_text[1] = "Space orbit.";
space2_text[2] = "In my space suit.";


// MAPPING
var AudioTextMap = {
  space1: space1_text,
  space2: space2_text
  // "space3": space3_text,
  // "space4": space4_text,
  // "space5": space5_text,
  // "space6": space6_text,
  // "space7": space7_text,
  // "space8": space8_text,
  // "space9": space9_text,
  // "fact1": fact1_text,
  // "fact2": fact2_text,
  // "fact3": fact3_text,
  // "fact4": fact4_text,
  // "fact5": fact5_text,
  // "fact6": fact6_text,
  // "fact7": fact7_text,
  // "fact8": fact8_text,
  // "fact9": fact9_text
};
