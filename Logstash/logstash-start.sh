rm ./data/plugins/inputs/jdbc/
curl -X DELETE http://elasticsearch:9200/client
curl -X DELETE http://elasticsearch:9200/client_phone
curl -X DELETE http://elasticsearch:9200/client_contact
curl -X DELETE http://elasticsearch:9200/client_contact_phone
"./bin/logstash" -f jdbc.conf