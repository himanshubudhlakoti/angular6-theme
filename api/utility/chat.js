module.exports=
{
    chat : chat
}
function chat(io , usersname)
{
    console.log("inside chat >>>>>>>>>>>>");
    //Whenever someone connects this gets executed
    io.on('connection', function(socket) {
        console.log('A user connected');
    
        //Whenever someone disconnects this piece of code executed
        socket.on('disconnect', function () {
        console.log('A user disconnected');
        });
    });
}