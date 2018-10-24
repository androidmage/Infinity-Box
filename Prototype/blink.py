import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
led = 17
GPIO.setup(led, GPIO.OUT)
# Switch on
GPIO.output(led, 1)
i = 0
while (i < 100):
    GPIO.output(led, 1)
    time.sleep(0.1)
    GPIO.output(led, 0)
    time.sleep(0.2)
    i += 1