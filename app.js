/* importar as configurações do servidor */
var app = require('./config/server');

var server = app.listen(80, function(){
  console.log('Servidor ON');
});

var io = require('socket.io').listen(server);

app.set('io', io);

/* CRIAr a conexao por Websocket*/
io.on('connection', function(socket){
  console.log('Usuario conectou');

  socket.on('disconnect', function(){
    console.log('Usuario desconnectou');
  });

  socket.on('msgParaServidor', function(data){

		/* dialogo */

    /* so para quem enviou */
		socket.emit(
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem}
		);

    /* para todo mundo menos para quem enviou*/
    socket.broadcast.emit(
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem}
		);
  });

});
