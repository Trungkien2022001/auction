FROM node:14
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
# FROM nginx:latest
# Copy tệp cấu hình Nginx của bạn vào container
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Copy tệp build từ builder stage vào thư mục public của Nginx
# COPY --from=builder /app/build /usr/share/nginx/html
# EXPOSE 80
CMD ["npm", "start"]