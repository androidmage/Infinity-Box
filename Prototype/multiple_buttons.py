import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

#led = 21

pins = [21, 25, 18]
#       0   1   2   3   4
names = ["First", "Second", "Third"]

for x in range(len(pins)):
    GPIO.setup(pins[x], GPIO.IN, pull_up_down=GPIO.PUD_UP)

#GPIO.setup(led, GPIO.OUT)


while True:
    input_state = 0
    for i in range(len(pins)):
        input_state = GPIO.input(pins[i])
        if input_state == False:
            print('Button {0} Pressed'.format(names[i]))
            time.sleep(0.2)
 #           if (i == 0):
  #              print("TURN ON LED")
   #             GPIO.output(led, 1)
    #        if (i == 1):
     #           print("TURN OFF LED")
      #          GPIO.output(led, 0)
