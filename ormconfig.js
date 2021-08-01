module.exports = {
  type: 'mongodb',
  url: process.env.MONGO_URL,
  useNewUrlParser: true,
  synchronize: true,
  useUnifiedTopology: true,
  entities: ['./**/*.entity.{js,ts}'],
}
