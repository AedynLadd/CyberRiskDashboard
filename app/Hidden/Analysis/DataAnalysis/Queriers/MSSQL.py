import json
import numpy
import pyodbc
import pandas


def connectEngine(column, isProgramData):
    DBCreds = json.loads("raqResults.json")
    if isProgramData:
        file = json.loads("programMapping.json")
    if isProgramData == False:
        file = json.loads("networkMapping.json")

    domain   = file[column]["domain"]
    server   = file[column]["server"]
    database = file[column]["database"]
    username = DBCreds["backend"]["username"]
    password = DBCreds["backend"]["password"]

    if username == "" & password == "":
        #Unencrypted Connection using Windows Credentials
        cnxn_str = ("Driver={SQL Server Native Client 11.0};"
                "Server="+domain+"\\"+server+";"
                "Database="+database+";"
                "Trusted_Connection=yes;") 
        cnxn = pyodbc.connect(cnxn_str)
        return cnxn
    else:
        #Encrypted Connection Using SQL Server Login
        cnxn_str = ("Driver={SQL Server Native Client 11.0};"
            "Server="+domain+"\\"+server+";"
            "Database="+database+";"
            "Trusted_Connection=yes;"
            "UID="+username+";"
            "PWD="+password+";") 
        cnxn = pyodbc.connect(cnxn_str)
        return cnxn


def readColummn(column, isProgramData):
    cnxn = connectEngine(column, isProgramData)
    cursor = cnxn.cursor()  
    table  = json.loads("raqResults.json")[column]["table"]
    col    = json.loads("raqResults.json")[column]["column"]
    data = pandas.read_sql("SELECT " + col + " FROM " + table, cnxn)
    cnxn.close()
    return(data)


def mergeColumns(data1, data2):
    mergedData = pandas.concat([data1, data2], axis=0)
    return mergedData




    