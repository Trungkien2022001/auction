@ECHO OFF

REM Start ZooKeeper
CALL "C:\kafka\bin\windows\zookeeper-server-start.bat" "C:\kafka\config\zookeeper.properties"

REM Pause for a moment to allow ZooKeeper to start before starting Kafka
timeout /t 3

REM Start Kafka
CALL "C:\kafka\bin\windows\kafka-server-start.bat" "C:\kafka\config\server.properties"

REM Pause for a moment to allow Kafka to start before starting Elasticsearch and Kibana
timeout /t 3

REM Start Elasticsearch
START "" "C:\elasticsearch\bin\elasticsearch.bat"

REM Pause for a moment to allow Elasticsearch to start before starting Kibana
timeout /t 3

REM Start Kibana
START "" "C:\kibana\bin\kibana.bat"
