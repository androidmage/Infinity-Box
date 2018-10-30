import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

pins = [4, 22, 27, 17]
names = ["LEFT", "RIGHT", "UP", "DOWN"]

for x in range(len(pins)):
    GPIO.setup(pins[x], GPIO.IN, pull_up_down=GPIO.PUD_UP)


while True:
    input_state = 0
    button = ""
    for i in range(len(pins)):
        input_state = GPIO.input(pins[i])
        if input_state == False:
            print('{0} Pressed'.format(names[i]))
            time.sleep(0.2)

