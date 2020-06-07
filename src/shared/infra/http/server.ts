import server from './app';

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀: Server running on port ${PORT}`);
});
