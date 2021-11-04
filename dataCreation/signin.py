import csv
import pandas as pd
import numpy as np
import names
import datetime

now = datetime.datetime.now()
steVal = ["INT", "FIN", "REQ", "CON"]

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

signins = np.random.choice(users, 10000)

times = []
times.append(now)
nxt = now + datetime.timedelta(0,13)
times.append(nxt)
for i in range (10000):
    nxt = nxt + datetime.timedelta(0,13)
    times.append(nxt)

headers = ["ID", "IP", "First Name", "Last Name", "Username", "State", "Time"]

with open("signins.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerow(headers)

for i in range (10000):
    st = []
    st.append(signins[i].getID())
    st.append(signins[i].getIP())
    st.append(signins[i].getfirstName())
    st.append(signins[i].getlastName())
    st.append(signins[i].getUsername())
    st.append(signins[i].uState)
    st.append(times[i])

    with open("signins.csv", "a") as f:
        writer = csv.writer(f)
        writer.writerow(st)

print("All finished")

#role/level of access->different tables/active directories for data -> also a separate file
#softwares allowed in the system-> also a separate file

# for ip address random creation: https://stackoverflow.com/questions/21014618/python-randomly-generated-ip-address-as-string
#https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers

