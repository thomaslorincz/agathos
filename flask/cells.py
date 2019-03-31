import pandas as pd
import shapefile
from shapely.geometry import shape, Point
import json


# read your shapefile
r = shapefile.Reader("ablatlon.shp")

# get the shapes
shapes = r.shapes()

# build a shapely polygon from your shape
polygon = shape(shapes[0])


def check(lon, lat):
    # build a shapely point from your geopoint
    point = Point(lon, lat)

    # the contains function does exactly what you want
    return polygon.contains(point)


output = dict()
output['type'] = 'FeatureCollection'
output['name'] = 'cell_towers'
output['crs'] = {"type": "name", "properties": {
    "name": "urn:ogc:def:crs:OGC:1.3:CRS84"}}

features = []


data = pd.read_csv('302.csv').T.to_dict().values()
print("Done...")
for i in data:
    if check(i['lon'], i['lat']):
        features.append(
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [i['lon'], i['lat']]
                },
                "properties": {
                    # 'created': i['created'],
                    # 'updated': i['updated'],
                    'radio': i['radio'],
                    # 'mcc': i['mcc'],
                    # 'net': i['net'],
                    # 'area': i['area'],
                    # 'cell': i['cell'],
                    'range': i['range'],

                }
            }
        )

output['features'] = features


with open('cell_towers.geojson', 'w') as outfile:
    json.dump(output, outfile)
