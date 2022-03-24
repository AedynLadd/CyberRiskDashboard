import json
import numpy
import pandas
import psycopg2


def connectEngine(column, isProgramData):
    DBCreds = json.loads("raqResults.json")
    if isProgramData:
        file = json.loads("programMapping.json")
    if isProgramData == False:
        file = json.loads("networkMapping.json")

    domain   = file[column]["domain"]
    server   = file[column]["server"]
    db = file[column]["database"]
    username = DBCreds["backend"]["username"]
    password = DBCreds["backend"]["password"]

    if username == "" & pw == "":
        #Unencrypted Connection using Windows Credentials
        cnxn = psycopg2.connect(
            host = domain +"\\" + server,
            database = db)
        return cnxn
    else:
        #Encrypted Connection Using SQL Server Login
        cnxn = psycopg2.connect(
            host = domain +"\\" + server,
            database = db,
            user = username,
            password = password)


def readColummn(column, isProgramData):
    cnxn = connectEngine(column, isProgramData)
    cursor = cnxn.cursor()  
    table   = json.loads("raqResults.json")[column]["table"]
    col    = json.loads("raqResults.json")[column]["column"]
    data = cursor.execute("SELECT " + col + " FROM " + table)
    cnxn.close()
    return(data)


def mergeColumns(data1, data2):
    mergedData = pandas.concat([data1, data2], axis=0)
    return mergedData