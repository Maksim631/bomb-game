let socket;
export const getSocket = () => {
  if (!socket) {
    socket = new Promise((resolve) => {
      const ws = new WebSocket('ws://localhost:3000/socket');
      ws.onopen = () => {
        console.log('Socket opened');
        resolve(ws);
      };
    });
  }
  return socket;
};
