import * as signalR from '@aspnet/signalr';

const configureSignalR = () => {
  var connection = new signalR.HubConnectionBuilder().withUrl("/alerts").build();

  connection.on("NewMessage",
    function (data) {
      console.log(data)
    }
  )

  connection.start().catch(function (err) {
    return console.error(err.toString());
  });
}

export default configureSignalR;

