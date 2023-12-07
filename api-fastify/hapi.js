const Hapi = require('@hapi/hapi');

const server = Hapi.server({
  port: 8080,
  host: 'localhost',
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Chào mừng đến với ứng dụng Hapi.js!';
  },
});

const start = async () => {
  try {
    await server.start();
    console.log(`Server đang chạy tại: ${server.info.uri}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
