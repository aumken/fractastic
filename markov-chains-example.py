import random

isSun = True # 70% chance it stays sunny, 30% chance it starts raining
isRain = False # 40% chance it stays raining, 60% chance it becomes sunny

weatherData = []
days = 14

for i in range(days):
    x = random.randint(1,10)
    if isSun:
        weatherData.append("sunny")
        if x > 7:
            isSun = False
            isRain = True
    elif isRain:
        weatherData.append("rain")
        if x > 4:
            isSun = True
            isRain = False

print(weatherData)