var socket = io.connect('http://localhost:80', {'forceNew': true});
//escucha los mensaje siempre en el canal mensajes
socket.on('messages', function (data) {
    console.log(data);
    motrarDatos(data);
})

function motrarDatos(data) {
    //mape [{},{}]
  
    var mensajes = data.map(function (elem, index) {
        
        return(`<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`);
    }).join(" ");
    $("#messages").append(mensajes);
    //document.getElementById('messages').innerHTML = html;
}

function addMessage() {
    var message = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };

    socket.emit('new-message', message);
    return false;
}

