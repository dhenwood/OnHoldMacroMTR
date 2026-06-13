import xapi from 'xapi';

let botToken = "replaceWithBotToken" // <== replace with the BOT token.
var navigatorDeviceId //this will get updated with the correct ID when the macro first runs.

async function getDeviceId(){
  let thisDeviceId = await xapi.Status.Webex.DeveloperId.get()
  let workspaceId = await getworkspaceId(thisDeviceId)
  await getNavigatorId(workspaceId)
}

async function getworkspaceId(deviceId){
  let headerAuth = "Authorization: Bearer " + botToken
  let url = "https://webexapis.com/v1/devices/" + deviceId  

  try {
    const response = await xapi.Command.HttpClient.Get({Header: headerAuth, ResultBody: "PlainText", Url: url});

    let responseBody = response.Body
    let responseJson = JSON.parse(responseBody)
    let workspaceId = responseJson.workspaceId
    return workspaceId

  } catch (err) {
    console.error('getworkspaceId failed:', err);
  }
}

async function getNavigatorId(workspaceId){
  let headerAuth = "Authorization: Bearer " + botToken
  let url = "https://webexapis.com/v1/devices?workspaceId=" + workspaceId  

  try {
    const response = await xapi.Command.HttpClient.Get({Header: headerAuth, ResultBody: "PlainText", Url: url});

    let responseBody = response.Body
    let responseJson = JSON.parse(responseBody)
    let items = responseJson.items
    
    items.forEach((item) => {
      let product = item.product
      let devicePlatform = item.devicePlatform
      if (product == "Cisco Room Navigator" && devicePlatform == "cisco"){
        navigatorDeviceId = item.id
        console.log("navigatorDeviceId: " + navigatorDeviceId)
      }
    })
  } catch (err) {
    console.error('getNavigatorId failed:', err);
  }
}


function postMessage() {
  let headerAuth = "Authorization: Bearer " + botToken
  let headerContent = "Content-Type: application/json"
  let url = "https://webexapis.com/v1/xapi/command/UserInterface.Message.Alert.Display"
  
  let body = {
    deviceId: navigatorDeviceId,
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
  getDeviceId()

  xapi.event.on('UserInterface Message Prompt Display', (value) => {
    if (value.Title == "Cisco Spaces Smart Workspaces") {
      postMessage()
    }
  });
}

init()
