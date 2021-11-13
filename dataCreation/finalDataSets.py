import csv
import pandas as pd
import numpy as np
import names
import datetime

now = datetime.datetime.now()
countries = ["Canada", "USA", "Sweden"]
ports = ["80", "20", "22", "25", "53", "115"]
steVal = ["INT", "FIN", "REQ", "CON"]
YorN = ["Y", "N"]

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


senders = np.random.choice(users, 10000)
signins = np.random.choice(senders, 1000)
receivers = np.random.choice(users, 10000)
byteTransfer = rng.integers(low=0, high=1000, size=10000)
dest = np.random.choice(countries, 10000, p=[0.49, 0.49, 0.02])
portNum = np.random.choice(ports, 10000)
attach = np.random.choice(YorN, 10000, p=[0.08, 0.92])

signInTimes = []
signInTimes.append(now)
addT = rng.integers(low=0, high=1000)
nx = now + datetime.timedelta(0,int(addT))
signInTimes.append(nx)
for i in range (len(signins)):
    addT = rng.integers(low=0, high=1000)
    nx = now + datetime.timedelta(0,int(addT))
    signInTimes.append(nx)


times = []
duration = []
times.append(signInTimes[len(signInTimes)-1])
timeadd = rng.integers(low=0, high=1000)
nxt = signInTimes[len(signInTimes)-1] + datetime.timedelta(0,int(timeadd))
times.append(nxt)
duration.append(int(timeadd))
for i in range (len(senders)):
    timeadd = rng.integers(low=0, high=1000)
    nxt = now + datetime.timedelta(0,int(timeadd))
    times.append(nxt)
    duration.append(int(timeadd))



headers1 = ["ID", "IP", "First Name", "Last Name", "Username", "State", "Time"]
headers2 = ["Sender ID", "Sender IP", "Sender State", "Receiver ID", "Receiver IP", "Receiver State", "Time", "Duration", "Destination", "Port Number", "Network Service", "Byte Transfer Amount", "Attachment"]

with open("signins.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerow(headers1)

for i in range (len(signins)):
    st = []
    st.append(signins[i].getID())
    st.append(signins[i].getIP())
    st.append(signins[i].getfirstName())
    st.append(signins[i].getlastName())
    st.append(signins[i].getUsername())
    st.append(signins[i].uState)
    st.append(signInTimes[i])

    with open("signins.csv", "a") as f:
        writer = csv.writer(f)
        writer.writerow(st)

print("All finished with signins")


with open("logs.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerow(headers2)

for i in range (len(senders)):
    st = []
    st.append(senders[i].ID)
    st.append(senders[i].IP)
    st.append(senders[i].uState)
    st.append(receivers[i].ID)
    st.append(receivers[i].IP)
    st.append(receivers[i].uState)
    st.append(times[i])
    st.append(duration[i])
    st.append(dest[i])
    if portNum[i] == "80":
        st.append(portNum[i])
        st.append("HTTP")
    elif portNum[i] == "20":
        st.append(portNum[i])
        st.append("FTP")
    elif portNum[i] == "22":
        st.append(portNum[i])
        st.append("SSH")
    elif portNum[i] == "25":
        st.append(portNum[i])
        st.append("SMTP")
    elif portNum[i] == "53":
        st.append(portNum[i])
        st.append("DNS")
    elif portNum[i] == "115":
        st.append(portNum[i])
        st.append("SFTP")
    else:
        st.append(portNum[i])
        st.append("N/A")
    st.append(byteTransfer[i])
    st.append(attach[i])

    with open("logs.csv", "a") as f:
        writer = csv.writer(f)
        writer.writerow(st)

print("All finished with logs")

#role/level of access->different tables/active directories for data -> also a separate file
#softwares allowed in the system-> also a separate file

# for ip address random creation: https://stackoverflow.com/questions/21014618/python-randomly-generated-ip-address-as-string
#https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers

