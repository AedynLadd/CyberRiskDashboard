import sys 
import time

print("TESTING TESTING 123")

for i in range(0,10):
    print(i)
    print("sleeping")
    time.sleep(3)

sys.stdout.flush()