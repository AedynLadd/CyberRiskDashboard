from numpy.lib.arraysetops import unique
import pandas as pd
import numpy as np
import json
import requests

print("Analyze network was called")
# The format our data has to be in is as follow.
#
# {
#   "nodes": [
#     {
#       "id": 1,
#       "name": "A"
#     }
#   ],
#   "links": [
#     {
#       "source": 1,
#       "target": 2
#     }
#     ]
# }
#

# We begin by importing the data...
network_data = pd.read_csv("./tester.csv")

## Creating Nodes
# Our first category are the nodes themselves, we can look for all known sender IPs and all known receiver IPs
sender_ip = (network_data[["srcip"]]).rename(columns={"srcip": "IP"})
receiver_ip = (network_data[["dstip"]]).rename(columns={"dstip": "IP"})
# Now we have a complete list of all unique IP addresses in our system...
unique_ip = pd.concat([sender_ip, receiver_ip], axis=0).drop_duplicates()


# We can use this to create our list of nodes
nodes = [{"id": str(unique_set[0]), "name": unique_set[0]} for unique_set in unique_ip.values]


## Creating Links
Send_to_receive = network_data[["srcip", "dstip"]].drop_duplicates()

# Create a list of established connections
links = [{"source":str(unique_set[0]), "target": str(unique_set[1])} for unique_set in Send_to_receive.values]


# Create the final data structure for a network!
data = {"nodes":nodes, "links": links}

with open('./app/Interface/MainApplication/network_data.json', 'w') as outfile:
    json.dump(data, outfile)

requests.post("http://localhost:8000/network_data.json")