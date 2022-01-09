import csv
import pandas as pd
import numpy as np
import names
import datetime

applic = ["R Programming", "Tableau Public", "Python", "SAS", "Apache Spark", "Excel", "RapidMiner", "KNIME", "QlikView", "Splunk", "Datapine", "MySQL", "Erwin", "Talend"]
departments = ["Business", "Human Resources", "Project Management", "Information Technology", "Marketing", "Production", "Accounting/Finance", "Research", "Customer Service", "Management"]

class User:
    def __init__(self, ID, IP, firstname, lastname, username, email, department, phoneNumber, location):
        self.ID = ID
        self.IP = IP
        self.firstName = firstname
        self.lastName = lastname
        self.username = username
        self.email = email
        self.department = department
        self.phoneNumber = phoneNumber
        self.location = location


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
    
    def getEmail(self):
        return self.email

    def getDepartment(self):
        return self.department

    def getPhoneNumber(self):
        return self.phoneNumber 
    
    def getLocation(self):
        return self.location

rng = np.random.default_rng(99999)
orgIPrange = "191.214.233."

userID = list(range(1,101))
userIP = []
for i in range (len(userID)):
    userIP.append(orgIPrange+str(userID[i]))

fnms = []
for i in range(len(userID)):
    fnms.append(names.get_first_name())

lnms = []
for i in range(len(userID)):
    lnms.append(names.get_last_name())

unms = []
for i in range(len(userID)):
    unms.append(fnms[i].lower() + str(userID[i]))

emls = []
for i in range(len(userID)):
    emls.append(fnms[i].lower() + "." + lnms[i].lower() + "@corp.mail.ca")
    
deps = np.random.choice(departments, len(userID))

numbs = []
nums = rng.integers(low=3940000, high=3949999, size=len(userID))
for i in range (len(nums)):
    numbs.append("613" + str(nums[i]))
    
locs = []
for i in range(len(userID)):
    locs.append("EM"+str(userID[i]))

users = []
for i in range (len(userID)):
    #these are arbitrary values for STATE changes these to something more meaningful
    users.append(User(userID[i], userIP[i], fnms[i], lnms[i], unms[i], emls[i], deps[i], numbs[i], locs[i]))

headers1 = ["ID", "IP", "First Name", "Last Name", "Username", "Email", "Department", "Phone Number", "Location"]

with open("directory.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerow(headers1)

for i in range (len(users)):
    st = []
    st.append(users[i].getID())
    st.append(users[i].getIP())
    st.append(users[i].getfirstName())
    st.append(users[i].getlastName())
    st.append(users[i].getUsername())
    st.append(users[i].getEmail())
    st.append(users[i].getDepartment())
    st.append(users[i].getPhoneNumber())
    st.append(users[i].getLocation())

    with open("directory.csv", "a") as f:
        writer = csv.writer(f)
        writer.writerow(st)

print("All finished with directory!")

#role/level of access->different tables/active directories for data -> also a separate file
#softwares allowed in the system-> also a separate file

# for ip address random creation: https://stackoverflow.com/questions/21014618/python-randomly-generated-ip-address-as-string
#https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers

