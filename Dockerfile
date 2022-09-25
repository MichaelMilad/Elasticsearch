FROM docker.elastic.co/logstash/logstash:8.4.1

WORKDIR /usr/share/logstash

RUN mkdir SQL-Statements
RUN mkdir -p data/plugins/inputs/jdbc

COPY ./Logstash/SQL-Statements/ ./SQL-Statements/
COPY ./Logstash/logstash-start.sh ./bin
COPY ./Logstash/mysql-connector-java-8.0.22.jar ./
COPY ./Logstash/jdbc.conf ./

CMD [ "bin/logstash-start.sh" ]