from itertools import product
import numpy as np
import pandas as pd
import datetime

# generate variables
variables = [("V{}".format(x)) for x in range(0,200)]

# generate datetime
base = datetime.datetime.today()
date_list = [(base + datetime.timedelta(days=x)).strftime("%m/%d/%Y") for x in range(30)]

variable_and_date = pd.DataFrame(list(product(variables, date_list)))

variable_and_date["valueA"] = np.random.randint(0,100, variable_and_date.shape[0])

variable_and_date["valueB"] = np.random.randint(0,100, variable_and_date.shape[0])
variable_and_date["valueC"] = np.random.randint(0,100, variable_and_date.shape[0])
variable_and_date.columns = ["group","variable","valueA","valueB","valueC"]

variable_and_date.to_csv("anomaly_heatmap.csv", index=False)