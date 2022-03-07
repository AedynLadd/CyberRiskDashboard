import csv
import pandas as pd
import numpy as np
import names
import datetime

steVal = ["INT", "FIN", "REQ", "CON"]
applic = ["R Programming", "Tableau Public", "Python", "SAS", "Apache Spark", "Excel", "RapidMiner", "KNIME", "QlikView", "Splunk", "Datapine", "MySQL", "Erwin", "Talend"]

class User:
    def __init__(self, ID, IP, firstname, lastname, username, uState):
        self.ID = ID
        self.IP = IP
        self.firstName = firstname
        self.lastName = lastname
        self.username = username
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
    
    def getUState(self):
        return self.uState

#populate from sql


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
    users.append(User(userID[i], userIP[i], fnms[i], lnms[i], unms[i], ste))


headers1 = ["ID", "IP", "First Name", "Last Name", "Username", "State", "Applications"]

with open("programs.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerow(headers1)

for i in range (len(users)):
    st = []
    st.append(users[i].getID())
    st.append(users[i].getIP())
    st.append(users[i].getfirstName())
    st.append(users[i].getlastName())
    st.append(users[i].getUsername())
    st.append(users[i].uState)

    numApps = rng.integers(low=1, high=8, size=1)
    apps = []
    apps = np.random.choice(applic, numApps, replace = False)
    st.append(apps)

    with open("programs.csv", "a") as f:
        writer = csv.writer(f)
        writer.writerow(st)

print("All finished with programs.")

#role/level of access->different tables/active directories for data -> also a separate file
#softwares allowed in the system-> also a separate file