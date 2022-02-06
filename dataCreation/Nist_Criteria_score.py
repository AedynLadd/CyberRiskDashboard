from random import random
import json


number_of_data = 10


def random_num():
    return round(random(), 2)

Nist_criteria = {
    "ID": {
        "color": "4be4ff2f",
        "items": {
            "ID.AM": [random_num() for x in range(0,number_of_data)],
            "ID.BE": [random_num() for x in range(0,number_of_data)],
            "ID.GV": [random_num() for x in range(0,number_of_data)],
            "ID.RA": [random_num() for x in range(0,number_of_data)],
            "ID.RM": [random_num() for x in range(0,number_of_data)],
            "ID.SC": [random_num() for x in range(0,number_of_data)]
        }
    },
    "PR": {
        "color": "da1eff2f",
        "items": {
            "PR.AC": [random_num() for x in range(0,number_of_data)],
            "PR.AT": [random_num() for x in range(0,number_of_data)],
            "PR.DS": [random_num() for x in range(0,number_of_data)],
            "PR.IP": [random_num() for x in range(0,number_of_data)],
            "PR.MA": [random_num() for x in range(0,number_of_data)],
            "PR.PT": [random_num() for x in range(0,number_of_data)]
        }
    },
    "DE": {
        "color": "fffc4b2f",
        "items": {
            "DE.AE": [random_num() for x in range(0,number_of_data)],
            "DE.CM": [random_num() for x in range(0,number_of_data)],
            "DE.DP": [random_num() for x in range(0,number_of_data)]
        }
    },
    "RS": {
        "color": "ff4b4b2f",
        "items": {
            "RS.RP": [random_num() for x in range(0,number_of_data)],
            "RS.CO": [random_num() for x in range(0,number_of_data)],
            "RS.AN": [random_num() for x in range(0,number_of_data)],
            "RS.MI": [random_num() for x in range(0,number_of_data)],
            "RS.IM": [random_num() for x in range(0,number_of_data)]
        }
    },
    "RC": {
        "color": "4bff692f",
        "items": {
            "RC.RP": [random_num() for x in range(0,10)],
            "RC.IM": [random_num() for x in range(0,10)],
            "RC.CO": [random_num() for x in range(0,10)]
        }
    }
}

with open('./app/Interface/MainApplication/Data/NIST_criteria.json', 'w') as outfile:
    json.dump(Nist_criteria, outfile)
