import json
import string
import numpy
import pandas
import mysql.connector


def connectEngine(column : string, isProgramData):
    DBCreds = json.loads("raqResults.json")
    if isProgramData:
        file = json.loads("programMapping.json")
    if isProgramData == False:
        file = json.loads("networkMapping.json")

    hostIP   = file[column]["domain"]
    db       = file[column]["database"]
    username = DBCreds["backend"]["username"]
    password = DBCreds["backend"]["password"]
    
    if username == "" & password == "":
        #Unencrypted Connection using Windows Credentials
        cnxn = mysql.connector.connect(
            host = hostIP,
            database = db)       
        return cnxn
    else:
        #Encrypted Connection Using SQL Server Login
        cnxn = mysql.connector.connect(
            username = username,
            password = password,
            host = hostIP,
            database = db) 
        return cnxn


def readColummn(column : string, isProgramData):
    cnxn = connectEngine(column, isProgramData)
    cursor = cnxn.cursor()  
    table   = json.loads("raqResults.json")[column]["table"]
    col    = json.loads("raqResults.json")[column]["column"]
    data = cursor.execute("SELECT " + col + " FROM " + table).fetchall()
    cnxn.close()
    return(data)