import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  conn.shell({ term: 'xterm' }, (err, stream) => {
    if (err) throw err;
    let output = '';
    stream.on('close', () => {
      console.log('Stream :: close');
      conn.end();
    }).on('data', (data) => {
      const text = data.toString();
      output += text;
      process.stdout.write(text);

      if (text.includes('Choose your server HTTP port:')) {
        stream.write('8080\n');
      } else if (text.includes('Choose your server HTTPS port:')) {
        stream.write('8443\n');
      } else if (text.includes('Choose a secret API key')) {
        stream.write('\n'); // Accept default secret key
      } else if (text.includes('Enter your Appwrite hostname')) {
        stream.write('appwrite.tranzlo.tech\n');
      } else if (text.includes('Enter a DNS A record hostname to serve as a CNAME')) {
        stream.write('\n');
      } else if (text.includes('Appwrite installed successfully')) {
        stream.write('exit\n');
      }
    });

    stream.write('mkdir -p /root/appwrite && cd /root/appwrite\n');
    stream.write('docker run -it --rm --volume /var/run/docker.sock:/var/run/docker.sock --volume "$(pwd)":/usr/src/code/appwrite:rw appwrite/appwrite init\n');
  });
}).connect({
  host: '187.124.35.158',
  port: 22,
  username: 'root',
  password: 'Cdromlg@8442'
});
