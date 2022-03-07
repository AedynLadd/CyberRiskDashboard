from itertools import product
import numpy as np
import pandas as pd
import datetime
import json

#QUERY BACKEND
def getBackend():
    raq = json.loads("raqResults.json")
    backend = file["backend"]
    if backend == "CSV":
        import CSV as back
    elif backend == "MSSQL":
        import MSSQL as back
    elif backend == "MongoDB":
        import MongoDB as back
    elif backend == "MySQL":
        import MySQL as back
    elif backend == "Oracle":
        import Oracle as back
    else:
        import PostgreSQL as back
    

getBackend()
data1 = back.readColumn("Sender IP", False)
data2 = back.readColumn("Receiver IP", False)
merged = back.mergeData(data1, data2)
unique = back.makeUnique(merged)

# We can use this to create our list of nodes
nodes = [{"id": str(unique_set[0]), "name": unique_set[0]} for unique_set in unique.values]


## Creating Links
Send_to_receive = network_data[["srcip", "dstip"]].drop_duplicates()

# Create a list of established connections
links = [{"source":str(unique_set[0]), "target": str(unique_set[1])} for unique_set in Send_to_receive.values]


# Create the final data structure for a network!
data = {"nodes":nodes, "links": links}

with open('./app/Interface/MainApplication/network_data.json', 'w') as outfile:
    json.dump(data, outfile)

requests.post("http://localhost:8000/network_data.json")