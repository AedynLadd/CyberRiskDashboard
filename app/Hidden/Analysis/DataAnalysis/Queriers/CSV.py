import csv
import json
import pandas


def readColumn(column, isProgramData):
    if isProgramData:
        file = json.loads("programMapping.json")
    if isProgramData == False:
        file = json.loads("networkMapping.json")

    filename   = file[column]["path"]
    clientColumn = file[column]["column"]
    file = pandas.read_csv(filename)
    data = file[[clientColumn]]
    return data


def makeUnique(data):
    return data.drop_duplicates()    


def mergeColumns(data1, data2):
    mergedData = pandas.concat([data1, data2], axis=0)
    return mergedData