import csv
import pandas as pd
import numpy as np
import datetime

now = datetime.datetime.now()
countries = ["Canada", "USA", "Sweden"]

class User:
	def __init__(self, ID, IP):
		self.ID = ID
		self.IP = IP
		
	def getID(self):
		print(self.ID)
		
	def getIP(self):
		print(self.IP)

rng = np.random.default_rng(99999)

orgIPrange = "191.214.233."

userID = list(range(1,101))
userIP = []
for i in range (len(userID)):
    userIP.append(orgIPrange+str(userID[i]))

users = []
for i in range (len(userID)):
    users.append(User(userID[i], userIP[i]))

senders = np.random.choice(users, 1000)
receivers = np.random.choice(users, 1000)
byteTransfer = rng.integers(low=0, high=1000, size=1000)
dest = np.random.choice(countries, 1000, p=[0.49, 0.49, 0.02])

times = []
times.append(now)
nxt = now + datetime.timedelta(0,13)
times.append(nxt)
for i in range (1000):
    nxt = nxt + datetime.timedelta(0,13)
    times.append(nxt)

headers = ["Sender ID", "Sender IP", "Receiver ID", "Receiver IP", "Time", "Destination", "Byte Transfer Amount"]

with open("tester.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerow(headers)

for i in range (1000):
    st = []
    st.append(senders[i].ID)
    st.append(senders[i].IP)
    st.append(receivers[i].ID)
    st.append(receivers[i].IP)
    st.append(times[i])
    st.append(dest[i])
    st.append(byteTransfer[i])

    with open("tester.csv", "a") as f:
        writer = csv.writer(f)
        writer.writerow(st)

print("All finished")

#role/level of access->different tables/active directories for data -> also a separate file
#softwares allowed in the system-> also a separate file

# for ip address random creation: https://stackoverflow.com/questions/21014618/python-randomly-generated-ip-address-as-string
