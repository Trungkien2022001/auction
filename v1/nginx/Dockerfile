# Sử dụng Nginx làm base image
FROM nginx:latest

# Tạo thư mục cho cấu hình và copy tệp nginx.conf vào thư mục /etc/nginx/conf.d/
RUN mkdir -p /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/conf.d/default.conf
