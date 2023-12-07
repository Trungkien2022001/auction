const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'Chào mừng đến với ứng dụng Koa!';
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 7070;

app.listen(port, () => {
  console.log(`Ứng dụng đang lắng nghe tại http://localhost:${port}`);
}
)
