import xapi from 'xapi';

let botToken = "replaceWithBotToken"
let deviceId = "replaceWithNavigatorDeviceId"

function postMessage() {
  let headerAuth = "Authorization: Bearer " + botToken
  let headerContent = "Content-Type: application/json"
  let url = "https://webexapis.com/v1/xapi/command/UserInterface.Message.Alert.Display"
  
  let body = {
    deviceId: deviceId,
    arguments: {
      "Duration": 2,
      "Target": "RoomScheduler",
      "Text": "Device has been put On-Hold",
      "Title": "On-Hold"
    }
  };
  let json = JSON.stringify(body)

  xapi.Command.HttpClient.Post({Header: [headerAuth, headerContent], Timeout: 10, Url: url}, json);
}

function init() {
  xapi.Config.HttpClient.Mode.set("On");

  xapi.event.on('UserInterface Message Prompt Display', (value) => {
    if (value.Title == "Cisco Spaces Smart Workspaces") {
      postMessage()
    }
  });
}

init()
