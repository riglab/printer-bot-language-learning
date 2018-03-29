from Adafruit_Thermal import *

printer = Adafruit_Thermal("/dev/ttyUSB0", 19200, timeout=5)
def printChunk(s):
    printer.println(s)
    printer.feed(2)

if __name__ == "__main__":
    printChunk("TEST")
