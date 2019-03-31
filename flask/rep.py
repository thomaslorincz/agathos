import re
import csv

f = open("crop_yields.txt", "r").read()

headers = [
    "year",
    "all wheat",
    "oats",
    "barley",
    "flaxseed",
    "canola",
    "all rye",
    "total",
    "chg"

]

c = open("yields.csv", "w")
writer = csv.writer(c, delimiter=',')
writer.writerow(headers)

x = re.findall('(\d{4})(?:\.+)([.,0-9 \-]+)', f)
for i in x:
    s = " ".join(i).split(" ")
    try:
        s.remove("")
    except:
        pass
    writer.writerow(s)

c.close()
