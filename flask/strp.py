# f = open('adb.geojson', 'r')
# s = f.read()
# f.close()

# s.replace(" ", "")

f = open('new.geojson', 'w')
f.close()

f = open("new.geojson", 'a')


with open("adb.geojson") as infile:
    for line in infile:
        f.write(line.replace(" ", "").replace(
            "", "").replace('"DBUID":"48', '"D":"'))


f.close()
