2. Làm thế nào để tránh trường hợp người bán spam sản phẩm của chính mình để sản phẩm được nên xu hướng
3. Làm thế nào để người dùng có thể theo dõi quá trình đấu giá của một sản phẩm
4. Làm thế nào để tránh server quá tải khi có quá nhiều sản phẩm đặt lịch đấu giá, sản phẩm đang đấu giá khi mỗi sản phẩm có một bộ bấm giờ riêng
5. Nếu server backend bị lỗi, tắt. Sản phẩm sẽ được cập nhật lại status.
6. Xử lý thế nào khi có kẻ cố ý gây rối trong phiên đấu giá của mình
7. vòng đời của một phiên đấu giá
8. Làm thế nào để xác thực người dùng
9. Làm thế nào để kiểm soát khi người dùng thêm sản phẩm mới
10. Socket sẽ xử lý thể nào khi user đăng nhập trên nhiều thiết bị
11. Tối ưu cơ sở dữ liệu
12. Tối ưu truy vấn
13. Authenticate, authorization api
14. Quá trình tìm kiếm

admin role authorization

11/04/2023: dashboard auction part 1

## Require: 
- Kafka
- Elasticsearch
- Kibana
- Erlang
- Zookeeper

## Command

### Elasticsearch cmd:

- run:

```bash
 .\bin\elasticsearch.bat
```

- add user:

```bash
    cd bin
    elasticsearch-users useradd <username> -p <password> -r superuser
```
- port: 9200
### Kibana cmd
- setup
```bash
    elasticsearch.hosts: ["http://localhost:9200"]
    elasticsearch.username: "admin"
    elasticsearch.password: "123456"
```
- run
```bash
    .\bin\kibana.bat
```
- port: 5601

### Kafka cmd
- setup
- run
```bash
    .\bin\windows\kafka-server-start.bat .\config\server.properties

```
- create Topic
```bash
    kafka-topics.bat --create --bootstrap-server localhost:9092 --topic test
```
- port: 9092
### Zookeeper cmd
- setup
- run
```bash
    .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties

```