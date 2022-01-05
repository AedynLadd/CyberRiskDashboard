import pandas as pd
import numpy as np
import json
# Data will end up in the following format
# "nodes": [
#     {
#         "node": X,
#         "name": "nodeX"
#     }
# ]
# "link": [
#     {
#         "source": A,
#         "target": B,
#         "value": 1
#     }
# ]

# We begin by importing the data...
user_directory = pd.read_csv("./directory.csv")

print(user_directory)
# group by department
user_directory_grouped = user_directory.groupby("Department")
user_directory_grouped = user_directory_grouped.apply(lambda x: x['Username'].unique())
print(user_directory_grouped)

sankey_df = {
    "nodes": [],
    "links": []
}

id = 0
for department, users in user_directory_grouped.iteritems():
    department_id = id
    sankey_df["nodes"].append(
        {
            "node": department_id,
            "name": department
        }
    )

    for worker in users:
        id += 1
        sankey_df["nodes"].append(
            {
                "node": id,
                "name": worker
            }
        )

        sankey_df["links"].append(
            {
                "source": department_id,
                "target": id, 
                "value": 1
            }
        )
    id += 1
    

with open('./app/Interface/MainApplication/sankey_data.json', 'w') as outfile:
    json.dump(sankey_df, outfile)


# requests.post("http://localhost:8001/edge_data.json")
