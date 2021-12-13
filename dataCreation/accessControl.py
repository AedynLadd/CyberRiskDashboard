import csv
import pandas as pd
import numpy as np
import names
import datetime

accessers = ["Developer", "IT", "HR Rep", "Management", "Business", "Internal Client", "Project Lead", "Student", "Employee"]
lU = 200
pcU = 200
sU = 10

class AssetUnit:
    def __init__(self, type, ID, location, canAccess):
        self.type = type
        self.ID = ID
        self.location = location
        self.canAccess = canAccess

    def getType(self):
        return self.type
		
    def getID(self):
        return self.ID

    def getLocation(self):
        return self.location
    
    def getAccess(self):
        return self.canAccess

rng = np.random.default_rng(99999)

Units = []
for i in range (lU):
    nAccess = rng.integers(low=1, high=8, size=1)
    accs = np.random.choice(accessers, nAccess, replace = False)
    Units.append(AssetUnit("Laptop", str("LU"+str(i)), i+100, accs))

for i in range (pcU):
    nAccess = rng.integers(low=1, high=8, size=1)
    accs = np.random.choice(accessers, nAccess, replace = False)
    Units.append(AssetUnit("PC", str("PCU"+str(i)), i+100, accs))

for i in range (sU):
    nAccess = rng.integers(low=1, high=8, size=1)
    accs = np.random.choice(accessers, nAccess, replace = False)
    Units.append(AssetUnit("PC", str("SU"+str(i)), str("B"+str(i)), accs))

headers1 = ["Type", "ID", "Location", "Can Access"]

with open("assetControl.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerow(headers1)

for i in range (len(Units)):
    st = []
    st.append(Units[i].getType())
    st.append(Units[i].getID())
    st.append(Units[i].getLocation())
    st.append(Units[i].getAccess())

    with open("assetControl.csv", "a") as f:
        writer = csv.writer(f)
        writer.writerow(st)

print("All finished with programs.")

#role/level of access->different tables/active directories for data -> also a separate file
#softwares allowed in the system-> also a separate file