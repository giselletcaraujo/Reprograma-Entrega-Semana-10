const app = require('./src/app');
const port = 3003;

app.listen(port, () => {
console.log(`app está rodando na porta ${port}`);
});