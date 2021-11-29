import csv
import pandas as pd
import numpy as np
import datetime

now = datetime.datetime.now()
countries = ["Canada", "USA", "Sweden"]
ports = ["80", "20", "22", "25", "53", "115"]
steVal = ["INT", "FIN", "REQ", "CON"]
YorN = ["Y", "N"]

class User:
    def __init__(self, ID, IP, uState):
        self.ID = ID
        self.IP = IP
        self.uState = uState

    def getID(self):
        print(self.ID)
		
    def getIP(self):
        print(self.IP)
    
    def getUState(self):
        print(self.uState)

rng = np.random.default_rng(99999)

orgIPrange = "191.214.233."

userID = list(range(1,101))
userIP = []
for i in range (len(userID)):
    userIP.append(orgIPrange+str(userID[i]))

users = []
for i in range (len(userID)):
    #these are arbitrary values for STATE changes these to something more meaningful
    ste = np.random.choice(steVal, p=[0.33, 0.33, 0.33, 0.01])
    users.append(User(userID[i], userIP[i], ste))

senders = np.random.choice(users, 100)
receivers = np.random.choice(users, 100)
byteTransfer = rng.integers(low=0, high=1000, size=10000)
dest = np.random.choice(countries, 100, p=[0.49, 0.49, 0.02])
dest = np.random.choice(countries, 10000, p=[0.49, 0.49, 0.02])
portNum = np.random.choice(ports, 10000)
attach = np.random.choice(YorN, 1000, p=[0.08, 0.92])

times = []
times.append(now)
nxt = now + datetime.timedelta(0,13)
times.append(nxt)
for i in range (100):
    nxt = nxt + datetime.timedelta(0,13)
    times.append(nxt)

headers = ["Sender ID", "Sender IP", "Sender State", "Receiver ID", "Receiver IP", "Receiver State", "Time", "Destination", "Port Number", "Network Service", "Byte Transfer Amount", "Attachment"]

with open("tester.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerow(headers)

for i in range (99):
    st = []
    st.append(senders[i].ID)
    st.append(senders[i].IP)
    st.append(senders[i].uState)
    st.append(receivers[i].ID)
    st.append(receivers[i].IP)
    st.append(receivers[i].uState)
    st.append(times[i])
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

    with open("tester.csv", "a") as f:
        writer = csv.writer(f)
        writer.writerow(st)

print("All finished")

#role/level of access->different tables/active directories for data -> also a separate file
#softwares allowed in the system-> also a separate file

# for ip address random creation: https://stackoverflow.com/questions/21014618/python-randomly-generated-ip-address-as-string
#https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers

