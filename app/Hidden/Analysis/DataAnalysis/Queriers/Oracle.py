import json
import numpy
import pandas
import cx_Oracle

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
        cnxn = cx_Oracle.connect(
            dsn = domain + "/" + server)
        return cnxn
    else:
        #Encrypted Connection Using SQL Server Login
        cnxn = cx_Oracle.connect(
            user = username,
            password = password,
            dsn = domain + "/" + server)
        return cnxn


def readColummn(column, isProgramData):
    cnxn = connectEngine(column, isProgramData)
    cursor = cnxn.cursor()  
    table   = json.loads("raqResults.json")[column]["table"]
    col    = json.loads("raqResults.json")[column]["column"]
    data = cursor.execute("SELECT " + col + " FROM " + table)
    cnxn.close()
    return(data)