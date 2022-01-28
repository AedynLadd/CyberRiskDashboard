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
programs_data = pd.read_csv("./programs.csv")


## Creating Nodes
# Our first category are the nodes themselves, we can look for all known sender IPs and all known receiver IPs
sender_ip = (network_data[["Sender IP"]]).rename(columns={"Sender IP": "IP"})
receiver_ip = (network_data[["Receiver IP"]]).rename(columns={"Receiver IP": "IP"})
# Now we have a complete list of all unique IP addresses in our system...
unique_ip = pd.concat([sender_ip, receiver_ip], axis=0).drop_duplicates()

# We can use this to create our list of nodes
def create_node(unique_set):
    print(unique_set)
    return {
        "id": str(unique_set[0]).split(".")[-1], 
        "name": unique_set[0],
        "data": eval(list(programs_data.loc[programs_data["IP"] == unique_set[0]]['Applications'])[0])
        }

nodes = [create_node(unique_set) for unique_set in unique_ip.values]
print(nodes)

## Creating Links
Send_to_receive = network_data[["Sender IP", "Receiver IP"]].drop_duplicates()

# Create a list of established connections
links = [{"source":str(unique_set[0]).split(".")[-1], "target": str(unique_set[1]).split(".")[-1]} for unique_set in Send_to_receive.values]


# Create the final data structure for a network!
data = {"nodes":nodes, "links": links}

with open('./app/Interface/MainApplication/network_data.json', 'w') as outfile:
    json.dump(data, outfile)

#requests.post("http://localhost:8000/network_data.json")