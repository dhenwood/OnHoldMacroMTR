# On-Hold Macro for Cisco MTR devices
## Background
This repo outlines the steps to update the outside Navigator of a Cisco MTR device to (1) blue LED strip (2) blue wallpaper (3) workspace logo to blue and (4) updates the text to indicate "On Hold". For devices running the native RoomOS experience, see [this repo](https://github.com/dhenwood/OnHoldMacro) for the details. **Note**: the following steps require the outside navigator to be in standalone mode but in the same workspace as the MTR (not in paired mode).

![alt text](https://github.com/dhenwood/OnHoldMacro/raw/main/OnHoldExample.png)

## Setup
A BOT token is used to send a message from the MTR device inside the room to the Navigator outside. The steps to create a BOT can be found here: https://developer.webex.com/messaging/docs/bots. The details of the BOT are not too important as they are not exposed to any user. Once created, **save the BOT token** to notepad.

In Control Hub; Select Workspaces, then search for the workspace you wish to configure. Follow the below steps to Edit the API access.

![alt text](https://www.employees.org/~dhenwood/Github/EditApiAccess.png)

Select the "Add user or bot" button. Search for the BOT name you created earlier. Once found, select this then select "Full access" as per following. Finally click Close

![alt text](https://www.employees.org/~dhenwood/Github/AddBotControl.png)

There are two macro files included in this repo. The [DeviceOnHoldMacro.js](https://github.com/dhenwood/OnHoldMacroMTR/blob/main/DeviceOnHoldMacro.js) macro needs to be updated to include the BOT token. On line 3, paste the BOT token obtained earlier then save it.

Upload the updated [DeviceOnHoldMacro.js](https://github.com/dhenwood/OnHoldMacroMTR/blob/main/DeviceOnHoldMacro.js) macro (that contains the BOT token) to the MTR video device and [NavigatorOnHoldMacro.js](https://github.com/dhenwood/OnHoldMacroMTR/blob/main/NavigatorOnHoldMacro.js) to the Navigator.
