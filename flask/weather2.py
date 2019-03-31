import pandas as pd
import csv
import datetime
import time


ref = "weather/eng-climate-summaries-Alberta-{},{}.csv"


final_output = open("weather.csv", "w")
writer = csv.writer(final_output, delimiter=',')
with open(ref.format("1", "2016")) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    count = 0
    for row in csv_reader:
        if count == 31:
            row.append("time")
            writer.writerow(row)
        count += 1
final_output.close()

final_output = open("weather.csv", "a")
writer = csv.writer(final_output, delimiter=',')


for i in range(2016, 2018):
    for j in range(1, 13):
        print(i, j)
        with open(ref.format(str(j), str(i))) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            count = 0
            line_max = 31
            for row in csv_reader:
                if count > line_max:
                    dt = datetime.date(year=i, month=j, day=1)
                    row.append((time.mktime(dt.timetuple())))
                    print(row, len(row))
                    writer.writerow(row)
                count += 1
        count = 0

final_output.close()
