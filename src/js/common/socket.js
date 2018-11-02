var socket = {};

socket.open = (onMessage) => {
    var steamUrl = Cookies.get(api.helpers.STEAM_URL_COOKIE_NAME);
    if (utils.isNullOrUndefined(steamUrl) || steamUrl.length == 0) {
        return;
    }
    if (socket.isOpen) {
        return;
    }

    socket.ws = null;
    socket.ws = new WebSocket(`ws://localhost:5000/ws?g=84597b26-cf34-418e-a61c-bc5a215d6b82&f=Test&u=${steamUrl}`);

    socket.ws.onopen = (event) => {
      console.log('=== SOCKET - ON OPEN ===');
      console.log(event);
      socket.isOpen = true;
      console.log('-------------------------');
    };
    socket.ws.onclose = (event) => {
      console.log('=== SOCKET - ON CLOSE ===');
      console.log(event);
      socket.isOpen = false;
      console.log('-------------------------');
    };

    socket.ws.onerror = (event) => {
      console.log('=== SOCKET - ON ERROR ===');
      console.log(event);
      console.log('-------------------------');
    };

    socket.ws.onmessage = (event) => {
      console.log('=== SOCKET - ON MESSAGE ===');
      var response = {
          message: JSON.parse(event.data)
      }
      console.log(event);
      console.log('--- RESPONSE - ');
      console.log(response);
      onMessage(response);
      console.log('-------------------------');
    };
}

socket.sendMessage = (params) => {
    console.log("=== SOCKET - ON SEND ===");
    if (!socket || !socket.isOpen || socket.ws.readyState !== WebSocket.OPEN) {
        console.log("Failed to send, socket is not open");
        return;
    }
    let msg = JSON.stringify({type: params.type, response: params.message});
    console.log(msg);
    console.log('-------------------------');
    socket.ws.send(msg);
}