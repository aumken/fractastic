// variables: A B
// axiom: A
// rules: (A -> AB), (B -> A)

var start = "A";
var result = start;
var rules = [];

rules[0] = {
  in: "A",
  out: "AB"
}

rules[1] = {
  in: "B",
  out: "A"
}

function create() {
  var nextText = "";
  for (var i = 0; i < result.length; i++) {
    var current = result.charAt(i);
    var ruleFound = false;
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].in) {
        ruleFound = true;
        nextText += rules[j].out;
        break;
      }
    }
    if (!ruleFound) {
      nextText += current;
    }
  }
  result = nextText;
  createP(result);
}

function setup() {
  noCanvas();
  createP("l-system: algae");
  var button = createButton("create!");
  button.mousePressed(create);
  createP(start);
}