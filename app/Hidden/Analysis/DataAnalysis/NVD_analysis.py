from itertools import product
from math import prod
import requests
import json
import pandas as pd
import numpy as np
import time

# Get the data on applications
programs_data = pd.read_csv("./programs.csv")

#unique_programs = programs_data["Applications"].explode().unique()
unique_programs = ["R Programming", "Tableau Public", "Python", "SAS", "Apache Spark", "Excel", "RapidMiner", "KNIME", "QlikView", "Splunk", "Datapine", "MySQL", "Erwin", "Talend"]


def get_product_CPES(product, organization = None, version_number = None):
    organization = "*" if organization == None else organization # If organization doesn't exist or is unknown replace with *
    version_number = "*" if version_number == None else version_number

    CVD_identifier = "cpe:2.3:*:{}:{}:{}".format(organization, product, version_number)
    
    req = requests.get("https://services.nvd.nist.gov/rest/json/cpes/1.0/?cpeMatchString={}&addOns=cves&includeDeprecated=false".format(CVD_identifier))
    
    time.sleep(1)

    return req.json()

def get_product_CVES(product, organization = None, version_number = None):
    organization = "*" if organization == None else organization # If organization doesn't exist or is unknown replace with *
    version_number = "*" if version_number == None else version_number

    CVD_identifier = "cpe:2.3:*:{}:{}:{}".format(organization, product, version_number)

    req = requests.get("https://services.nvd.nist.gov/rest/json/cves/1.0/?cpeMatchString={}&resultsPerPage=1000".format(CVD_identifier))

    return req.json()

def format_cves(product_cves):
    # This is just to store the relevant information and dispose of any extrenous data that we dont currently need.
    cve_scores = []

    for cve in product_cves["result"]["CVE_Items"]:
        try:
            cve_scores.append({
                "cve_id": cve["cve"]["CVE_data_meta"]["ID"],
                "base_score": cve["impact"]["baseMetricV3"]["cvssV3"]["baseScore"],
                "exploitabilityScore": cve["impact"]["baseMetricV3"]["exploitabilityScore"],
                "impactScore": cve["impact"]["baseMetricV3"]["impactScore"]
            })
        except Exception as e:
            # If an expection occurs its most likely because only a v2 cve is available
            # This is ok, we just change some variable names
            cve_scores.append({
                "cve_id": cve["cve"]["CVE_data_meta"]["ID"],
                "base_score": cve["impact"]["baseMetricV2"]["cvssV2"]["baseScore"],
                "exploitabilityScore": cve["impact"]["baseMetricV2"]["exploitabilityScore"],
                "impactScore": cve["impact"]["baseMetricV2"]["impactScore"]
            })

    return cve_scores

programs_and_cves = {}

for program in unique_programs:
    print("Finding CVES for {}".format(program))
    try:
        product_name = program.replace(" ", "_").lower()
        product_cves = get_product_CVES(product_name)
        programs_and_cves[program] = format_cves(product_cves)
    except Exception as e:
        print(e)
        break


# Write to a json file
with open('./app/Interface/MainApplication/Data/NVD_analysis.json', 'w') as outfile:
    json.dump(programs_and_cves, outfile)