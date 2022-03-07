from pymongo import MongoClient
import json

def connectEngine(column, isProgramData):
    DBCreds = json.loads("raqResults.json")
    if isProgramData:
        file = json.loads("programMapping.json")
    if isProgramData == False:
        file = json.loads("networkMapping.json")

    ip       = file[column]["ip"]
    port     = file[column]["port"]
    username = DBCreds["backend"]["username"]
    password = DBCreds["backend"]["password"]

    if username == "" & password == "":
        #Unencrypted Connection using Windows Credentials
        cnxn = MongoClient(host = ip + ":" + port)
        return cnxn
    else:
        #Encrypted Connection Using SQL Server Login
        cnxn = MongoClient(
            host = ip + ":" + port,
            username = username,
            password= password)
        return cnxn


def readColummn(column, isProgramData):
    cnxn = connectEngine(column, isProgramData)
    database   = json.loads("raqResults.json")[column]["database"]
    table   = json.loads("raqResults.json")[column]["collection"]
    col    = json.loads("raqResults.json")[column]["field"]
    data = cnxn[database][table].find({},{col : 1})
    return(data)


