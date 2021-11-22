import pandas as pd
import numpy as np
import json
import requests
# The format our data has to be in is as follow.
#
# [
#   "name": X, "size": 1, "imports": [destinations]
# ]
#

# We begin by importing the data...
network_data = pd.read_csv("./tester.csv")

unique_row_count = network_data.groupby(["srcip", "dstip"]).size().reset_index(name='Count')

grouped_df = unique_row_count.groupby("srcip")

# Get a total count and list of receiver IPs 
sender_receiver_amount = grouped_df["Count"].apply(sum)
sender_receiver_coordination = grouped_df["dstip"].apply(list)

merge_data = pd.concat([sender_receiver_coordination, sender_receiver_amount], axis=1).reset_index()


edge_bundle_data = [{"name": data_row[0], "size": data_row[2], "imports": data_row[1] } for data_row in merge_data.values]

with open('./app/Interface/MainApplication/edge_data.json', 'w') as outfile:
    json.dump(edge_bundle_data, outfile)

requests.post("http://localhost:8001/edge_data.json")
