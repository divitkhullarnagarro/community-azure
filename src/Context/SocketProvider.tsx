import { useEffect, useState } from 'react';
const io = require('socket.io-client');
import SocketContext from './SocketContext';

function SocketProvider(props: any) {
  const [socket, setSocket] = useState<any>();
  const socketServerUrl = 'wss://20.244.37.209/';
  const [socketEndpoint, setSocketEndpoint] = useState(socketServerUrl);
  useEffect(() => {
    if (!socket) {
      const newSocket = io(socketEndpoint, {
        transports: ['websocket'],
        upgrade: false,
        // secure: true,
        rejectUnauthorized: false,
        query: {
          v: '2.0.0',
          // EIO: 3,
        },
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        setSocket(null);
      };
    }

    return socket;
  }, []);

  useEffect(() => {
    socket?.on('connect', function () {
      console.log('SocketConnected');
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, setSocket, socketEndpoint, setSocketEndpoint }}>
      {props?.children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
