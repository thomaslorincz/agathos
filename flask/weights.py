import csv
import datetime
import time
import math

w = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 2,
    "6": 14,
    "7": 48,
    "8": 58,
    "9": 43,
    "10": 22,
    "11": 3,
    "12": 1

}

rows = []

final_output = open("new_yields.csv", "w")
writer = csv.writer(final_output, delimiter=',')
with open('yields.csv', 'r') as csv_file:
    fl = csv.reader(csv_file, delimiter=',')
    for i in fl:
        writer.writerow(i)
        break

with open('yields.csv', 'r') as csv_file:
    d = csv.DictReader(csv_file)
    for i in d:
        for j in range(1, 13):
            row = []
            dt = datetime.date(year=int(i['year']), month=j, day=1)
            row.append(int(time.mktime(dt.timetuple())))
            for h, g in i.items():
                if h == "year":
                    continue
                try:
                    val = float(g.replace(',', ''))*(w[str(j)]/191)
                except:
                    val = 0
                row.append(round(val, 1))
            print(row)
            writer.writerow(row)

final_output.close()
