var start = "A";
var result = start;
var rules;
var len = 5;

rules = {
    "A": [
        {
            probability: 0.20,
            out: "A[+A]A[-A]A"
        },
        {
            probability: 0.40,
            out: "AA-[-A+A+B]+[+A-A-A]"
        },
        {
            probability: 0.40,
            out: "AA+[+A-A-A]-[-A+A+B]"
        }
    ]
}

function create() {
    
  var nextText = "";
  for (var i = 0; i < result.length; i++) {
    let r = Math.random();
    let p = 0;
    var current = result.charAt(i);
    if (current == "A") {
        for (let i=0; i < rules.A.length; i++) {
            p += rules.A[i].probability;
            if (r < p) {
                nextText += rules.A[i].out;
            }
        }
    } else {
        nextText += current;
    }
  }
  result = nextText;
  createP(result);
  turtle();
}

function turtle() {
    background(0);
    resetMatrix();
    translate(width / 2, height);
    stroke(255);

    for (var i = 0; i < result.length; i++) {
        var current = result.charAt(i);

        if (current == "A") {
            line(0, 0, 0, -len);
            translate(0, -len);
        } else if (current == "-") {
            rotate(PI/7);    
        } else if (current == "+") {
            rotate(-PI/7);
        } else if (current == "[") {
            push();
        } else if (current == "]") {
            pop();
        } else if (current == "B") {
            circle(0,0,len);
        }
    }
}

function setup() {
  createCanvas(1000, 500)
  background(0);
  turtle();
  createP("l-system + probability: fractal plant");
  var button = createButton("create!");
  button.mousePressed(create);
  createP(start);
}