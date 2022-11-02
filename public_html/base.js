var nome = prompt('Digite o seu nome');
$(function(){
    $('h1.myname').html(nome)

    $('ul#listacontatos li.contato').on('click',function(){
        var nome = $(this).attr("UserName")
        var id = $(this).attr('UserId')
        $('h2.nomeContato').html(nome)
    })

    var socket = io.connect("http://localhost/");

    socket.emit('message',JSON.stringify({type:'c',data:nome}))
    socket.on('message',mensagem=>{
        alert(mensagem)
    })
})