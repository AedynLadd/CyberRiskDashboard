import csv
import pandas as pd
import numpy as np

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

headers = ["Sender ID", "Sender IP", "Receiver ID", "Receiver IP", "Byte Transfer Amount"]

with open("tester.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerow(headers)

for i in range (1000):
    st = []
    st.append(senders[i].ID)
    st.append(senders[i].IP)
    st.append(receivers[i].ID)
    st.append(receivers[i].IP)
    st.append(byteTransfer[i])

    with open("tester.csv", "a") as f:
        writer = csv.writer(f)
        writer.writerow(st)

print("All finished")

# for ip address random creation: https://stackoverflow.com/questions/21014618/python-randomly-generated-ip-address-as-string
