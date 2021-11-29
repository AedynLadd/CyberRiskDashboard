import csv
import pandas as pd
import numpy as np
import names
import datetime

now = datetime.datetime.now()
steVal = ["INT", "FIN", "REQ", "CON"]
accessers = ["Developer", "IT", "Human Resource", "Management", "Business", "Internal Client", "Project Lead", "Student"]
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

class User:
    def __init__(self, ID, IP, firstname, lastname, username, userType, uState):
        self.ID = ID
        self.IP = IP
        self.firstName = firstname
        self.lastName = lastname
        self.username = username
        self.userType = userType
        self.uState = uState

    def getID(self):
        return self.ID
		
    def getIP(self):
        return self.IP

    def getfirstName(self):
        return self.firstName
    
    def getlastName(self):
        return self.lastName
    
    def getUsername(self):
        return self.username
    
    def getUserType(self):
        return self.userType
    
    def getUState(self):
        return self.uState

rng = np.random.default_rng(99999)
orgIPrange = "191.214.233."

userID = list(range(1,1001))
userIP = []
for i in range (len(userID)):
    userIP.append(orgIPrange+str(userID[i]))

fnms = []
for i in range(1000):
    fnms.append(names.get_first_name())
lnms = []
for i in range(len(fnms)):
    lnms.append(names.get_last_name())
unms = []
for i in range(len(fnms)):
    unms.append(fnms[i].lower() + str(userID[i]))

users = []
for i in range (len(userID)):
    #these are arbitrary values for STATE changes these to something more meaningful
    ste = np.random.choice(steVal, p=[0.33, 0.33, 0.33, 0.01])
    aType = np.random.choice(accessers)
    users.append(User(userID[i], userIP[i], fnms[i], lnms[i], unms[i], aType, ste))

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

accessTimes = []
accessTimes.append(now)
addT = rng.integers(low=0, high=1000)
nx = now + datetime.timedelta(0,int(addT))
accessTimes.append(nx)
for i in range (len(Units)):
    addT = rng.integers(low=0, high=1000)
    nx = now + datetime.timedelta(0,int(addT))
    accessTimes.append(nx)

headers1 = ["Type", "ID", "Location", "Can Access", "Last Accessed User ID", "Last Accessed User IP", "Last Accessed User First Name", 
            "Last Accessed User Last Name", "Last Accessed User Username", "Last Accessed User Type", "Last Accessed User State", "Last Access Time"]

with open("assetLog.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerow(headers1)

for i in range (len(Units)):
    st = []
    st.append(Units[i].getType())
    st.append(Units[i].getID())
    st.append(Units[i].getLocation())
    st.append(Units[i].getAccess())

    use = np.random.choice(users)
    st.append(use.getID())
    st.append(use.getIP())
    st.append(use.getfirstName())
    st.append(use.getlastName())
    st.append(use.getUsername())
    st.append(use.getUserType())
    st.append(use.uState)
    st.append(accessTimes[i])

    with open("assetLog.csv", "a") as f:
        writer = csv.writer(f)
        writer.writerow(st)

print("All finished with programs.")

#role/level of access->different tables/active directories for data -> also a separate file
#softwares allowed in the system-> also a separate file