import json

with open('adb.geojson') as json_data:
    d = json.load(json_data)
    json_data.close()


def utf8len(s):
    return len(s.encode('utf-8'))


s = ""

g = "48030164012"

feats = d['features']

for i in feats:
    if "4811" in i["properties"]["DBUID"][:4]:
        # s += json.dumps(i)
        feats.remove(i)
        # pass
    if "4806" in i["properties"]["DBUID"][:4]:
        # pass
        # s += json.dumps(i)
        feats.remove(i)

        # print(utf8len(s))

d['features'] = feats
with open('newer.geojson', 'w') as outfile:
    json.dump(d, outfile)

# print(g[:4])
