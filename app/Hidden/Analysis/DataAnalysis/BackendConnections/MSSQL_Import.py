import json
import numpy
import pyodbc
import pandas

#replace with local values
DBCreds = json.loads("RAQ_Result_Dummy.json")
domain   = DBCreds["domain"]
server   = DBCreds["server"]
database = DBCreds["dashboard"]
username = DBCreds["username"]
password = DBCreds["password"]


'''
#Unencrypted Connection using Windows Credentials
cnxn_str = ("Driver={SQL Server Native Client 11.0};"
            "Server="+domain+"\\"+server+";"
            "Database="+db+";"
            "Trusted_Connection=yes;")
cnxn = pyodbc.connect(cnxn_str)
cursor = cnxn.cursor()
'''

#Encrypted Connection Using SQL Server Login
cnxn_str = ("Driver={SQL Server Native Client 11.0};"
            "Server="+domain+"\\"+server+";"
            "Database="+database+";"
            "Trusted_Connection=yes;"
            "UID="+username+";"
            "PWD="+password+";")
cnxn = pyodbc.connect(cnxn_str)
cursor = cnxn.cursor()

def readLogData():
    #Reading Data 
    data = pandas.read_sql("SELECT * FROM CAPTURELOG", cnxn)
    return(data.to_string)

def readProgramData():
    #Reading Data 
    data = pandas.read_sql("SELECT * FROM PROGRAMS", cnxn)
    return(data.to_string)

def readUserData():
    #Reading Data 
    data = pandas.read_sql("SELECT * FROM USERS", cnxn)
    return(data.to_string)

