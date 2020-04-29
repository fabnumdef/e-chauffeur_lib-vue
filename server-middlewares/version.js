export default function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(process.env.VERSION);
}
