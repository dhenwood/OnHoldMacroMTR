# On-Hold Macro - standalone Navigator
This macro updates the Cisco Navigator outside panel to On-Hold (blue) when requested by a user in Cisco Spaces. This includes the background image, workspace avatar, LED strip on the wall mount, and the main text. If no one books the room after 3 minutes or if a user presses "Book Room" from the outside panel, it will return to its default state.

![alt text](https://github.com/dhenwood/OnHoldMacro/blob/main/OnHoldExample.png)

## Options
There are three options for providing this capability. The differences between each is as follows;
1. Macro for paired Navigators. When your Navigator is paired (not standalone) to the codec. Note for **MTR's**, most of the features will work however the ability to change the text to "On-Hold" is not available when paired _and_ in MTR mode. [Github repo here](https://github.com/dhenwood/OnHoldMacro)
2. Macro for Navigators in standalone. In this case, messages between the codec and Navigator are sent via the Webex cloud. For MTR's this option works in full (unlike option 1).
3. Workspace Integration. This option makes deploying the capability for a large fleet of devices the easiest. It is built on a server and made available for all devices (not requiring deploying the macro to every device). [Github repo here](https://github.com/dhenwood/Workspace-Integration)

This repo is for option 2 - devices running the native RoomOS or MTR and with the Navigator in standalone mode.

## Setup
A BOT token is used to send a message from the MTR device inside the room to the Navigator outside. The steps to create a BOT can be found here: https://developer.webex.com/messaging/docs/bots. The details of the BOT are not too important as they are not exposed to any user. Once created, **save the BOT token** to notepad.

In Control Hub; Select Workspaces, then search for the workspace you wish to configure. Follow the below steps to Edit the API access.

![alt text](https://www.employees.org/~dhenwood/Github/EditApiAccess.png)

Select the "Add user or bot" button. Search for the BOT name you created earlier. Once found, select this then select "Full access" as per following. Finally click Close

![alt text](https://www.employees.org/~dhenwood/Github/AddBotControl.png)

There are two macro files included in this repo. The [DeviceOnHoldMacro.js](https://github.com/dhenwood/OnHoldMacroMTR/blob/main/DeviceOnHoldMacro.js) macro needs to be updated to include the BOT token. On line 3, paste the BOT token obtained earlier then save it.

Upload the updated [DeviceOnHoldMacro.js](https://github.com/dhenwood/OnHoldMacroMTR/blob/main/DeviceOnHoldMacro.js) macro (that contains the BOT token) to the MTR video device and [NavigatorOnHoldMacro.js](https://github.com/dhenwood/OnHoldMacroMTR/blob/main/NavigatorOnHoldMacro.js) to the Navigator.
