# fractastic

the intersection between math and nature is where you'll find [l-systems](http://algorithmicbotany.org/papers/abop/abop.pdf). short for lindenmayer systems, l-systems provide a mathematical base for understanding plant growth, and can also be used to generate beautiful geometric structures and fractals. 

l-systems are considered to be a type of 'formal grammar' -- given a language's alphabet and syntax, it describes the method in which strings can be formed. although it is most intuitive to apply formal language theory to 'human' languages, its application in l-systems enables us to produce strings given variables, rules and an axiom. and with these strings, we can create fascinating visualizations.


## what are l-systems?

l-systems can be defined as the following tuple:

`G = (V, ω, P)`

where
- `V` represents the alphabet that the l-system will work with, which contains variables and constants
- `ω` is a cool looking 'w' that gives us the starting point of the l-system's resulting string
- `P` are the rules that the variables follow to obtain resulting variables and/or constants

'colorless green ideas sleep furiously'. famous linguist noam chomsky composed this sentence in his book *syntactic structures* as an example of a statement that follows gramatical convention, but has no semantic meaning (fun fact: there was a [competition at stanford](https://en.wikipedia.org/wiki/Colorless_green_ideas_sleep_furiously#Stanford_1985_competition) in 1985 for contestants to make the sentence meaningful). i would like to think that chomsky followed an 'l-system' to produce such an odd sentence, where his `V` consisted of gramatical terms such as NP (noun phrase) and AdjP (adjective phrase), his `ω` was S (subject), and his `P` included rules such that N' -> AdjP N' and N' -> N' (we will talk about stoachastic processes to decided when to follow which rule here for N' later).

assuming these parameters for chomsky's hypothetical l-system, he could've arrived at his iconically nonesensical statement.

![cgisf x-bar](/images/colorless-green.png)


### examples

here is where the coding starts. i'm using p5.js for these l-system examples.

**algae** \
this is a text based l-system, which lindenmayer originally used to model algae growth. pretty simple text-based way of understanding l-systems.

- `V = A, B` 
- `ω = A` 
- `P = (A -> AB), (B -> A)`

![algae](/images/algae.png)

**fractal tree** \
otherwise known as a binary tree (although that may confuse people with the data structure), fractal trees and the following l-systems required me to use turtle graphics to produce visualizations. the turtle uses a lifo stack with the `push()` and `pop()` functions in order to store and restore the turtle's current position and angle. 

- `V = A, B, [, ]`
- `ω = A` 
- `P = (A -> B[A]A), (B -> BB)` 
- angle = pi/4

![fractal tree](/images/fractal-tree.png)

**koch curve** \
the koch curve first appeared in a 1904 [paper](https://www.taylorfrancis.com/chapters/edit/10.1201/9780429037252-3/continuous-curve-without-tangents-constructive-elementary-geometry-helge-von-koch) by swedish mathematician helge von koch. it has since been used as the basis for a popular fractal curve known as the koch snowflake. 

- `V = A, +, -`
- `ω = A` 
- `P = (A -> A+A−A−A+A)` 
- angle = pi/2

![koch curve](/images/koch-curve.png)

**sierpinski arrowhead curve** \
this sierpinski l-system is an approximation for the sierpinski triangle -- as you iterate through more generations of the l-system, the curve will draw similarities to the triangle. i observed that when the number of iterations is odd, the fractal is mirrored across the x-axis. don't ask me how long it took for me to realize that the fractal flips weren't because of some error in the code.

- `V = A, B, +, -`
- `ω = A` 
- `P = (A -> B−A−B), (B -> A+B+A)` 
- angle = pi/3

![sierpinski arrowhead curve](/images/sierpinski-arrowhead-curve.png)

**dragon curve** \
using 'dragon' as an adjective makes anything more appealing -- it's why i want to learn the sicilian defense **dragon** variation. you can't tell me that doesn't sound sick.

- `V = A, B, +, -`
- `ω = A` 
- `P = (A -> A+B), (B -> A-B)` 
- angle = pi/2

![dragon curve](/images/dragon-curve.png)

**fractal plant** \
this is where you can really start to see how l-systems could be applied to model plant development. the variable `A` doesn't actually produce any drawing action, but rather helps the evolution process of the fractal.

- `V = A, B, +, -, [, ]`
- `ω = A` 
- `P = (A -> B+[[A]-A]-B[-BA]+A), (B -> BB)` 
- angle = pi/7

![fractal plant](/images/fractal-plant.png)

## what is a markov chain?

it'll seem like i'm completely jumping ships here but bear with me, i'll tie everything together soon.

in plain english, markov chains can be summarized by the quote: "what happens next depends only on the state of affairs now." markov chains provide a mathematical model to describe a sequence of events such that the probability of a certain event happening in the immediate future purely depends on the current state of the model. the process is named after russian mathematicial andrey markov, and is used across various disciplines and in many real-world processes. 

### example

i think the best way i understood markov chains was when it was coupled with predicting the weather. lets say its sunny -- using markov chains we can make a claim that there is a 70% chance it stays sunny, and 30% chance it will rain the next day. now lets say that its raining -- using markov chains we can make another claim that there is only a 40% chance it will continue to rain the next day, and a 60% chance it will be sunny. we can visualize this markov chain with this diagram:

![markov-chain-example](/images/markov-chain-example.png)

a simple python model of this markov chain could look like this:

```
import random

isSun = True 
isRain = False

weatherData = []
days = 14

for i in range(days):
    x = random.randint(1,10)
    if isSun:
        weatherData.append("sunny")
        if x > 7: # 70% chance it stays sunny, 30% chance it starts raining
            isSun = False
            isRain = True
    elif isRain:
        weatherData.append("rain")
        if x > 4: # 40% chance it stays raining, 60% chance it becomes sunny
            isSun = True
            isRain = False

print(weatherData)
```
and a possible result would look like this:
`['sunny', 'sunny', 'rain', 'rain', 'sunny', 'sunny', 'sunny', 'sunny', 'sunny', 'rain', 'rain', 'sunny', 'rain', 'sunny']`

## creating stochastic l-systems

congrats on making it this far. now, if you didn't already notice, the l-system examples all output the same fractals on each run, but say we wanted to randomize our geometric creations and mimic the randomness of nature -- we could either use basic probability or ... markov chains! there isn't a specific reason why you need to use markov chains, i just happened to be reading about both l-systems and markov chains around the same time and thought it would be cool to fuse them together. there is probably some instance in some plant's development where a markov chain would be a suitable model, but i'm not aware of such a situation yet. in section 1.7 of lindenmayer and prusinkiewicz's [paper](http://algorithmicbotany.org/papers/abop/abop.pdf) on algorithmic botany, we can see a brief introduction to probabilistic l-series, but we can expand on basic probability assignments using markov chains.

### examples

**fractal plant (basic probability)** \
upon each generation, this fractal plant produces a new, randomized result. the key distinguisher of this fractal plant is that each variable has many rules assigned to it -- it's up to probability to decide which rule it will follow.

- `V = A, B, +, -, [, ]`
- `ω = A` 
- `P = (.2)(A -> A[+A]A[-A]A), (.4)(A -> AA-[-A+A+B]+[+A-A-A]), (.4)(A -> AA+[+A-A-A]-[-A+A+B])` 
- angle = pi/7

![fractal plant (basic probability)](/images/prob-fractal-plant.png)

**fractal plant (markov chain)** \
although this variation of this fractal plant looks very similar to the basic probability l-system, it uses a stochastic matrix to describe the probability of transitioning 'states' in this markov chain -- transitioning from the use of one rule to another, based on the most recent rule that we used. to pick which rule we will follow next, we can look at the rule we previously followed and look at its probability values for transitioning to the same or a different rule.

- `V = A, B, +, -, [, ]`
- `ω = A` 
- `P = [0.2, 0.4, 0.4](A -> A[+A]A[-A]A), [0.4, 0.2, 0.4](A -> AA-[-A+A+B]+[+A-A-A]), [0.4, 0.4, 0.2](A -> AA+[+A-A-A]-[-A+A+B])` 
- angle = pi/7

![fractal plant (basic probability)](/images/markov-fractal-plant.png)


in the future, i might look into more strategic implementations of markov chains in l-systems to produce more natural looking fractal plants. an example that comes to mind would be decreasing the likelyhood of new branches forming back to back.
