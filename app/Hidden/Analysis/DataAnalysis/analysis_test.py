import requests
import uuid
import time

unique_analysis_id = uuid.uuid4()

pload = {'username': unique_analysis_id,'password':'123'}

# We can send streams of data directly to main using an http POST request this can be streams of actual data
# this can also be used to send the data itself for anything thats potentially done in real time
requests.post("http://localhost:8080", data=pload)
requests.post("http://localhost:8080", data=pload)
requests.post("http://localhost:8080", data=pload)
requests.post("http://localhost:8080", data=pload)

