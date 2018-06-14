# Language Learning Robot Study

## Setting up the robot

- Start-up the robot
- From a new terminal window on your computer, connect to the robot: `ssh pi@spyderbot`
- Go into the `printer-bot-language-learning` directory: `cd printer-bot-language-learning`
- Run the node server: `node index.js`
- Open a new terminal window and connect to the robot [see previous step]
- Open Chrome on the robot and go to the study's participant view: `DISPLAY=:0 chromium-browser --kiosk --incognito https://localhost:3000`
- When prompted with the browser's warning dialog, select advanced and proceed with continuing to the site

## Setting up your computer

- Ensure you're connected to the same wifi network as the robot
- Within Chrome, go to the website using the robot's ip address to see the particpant view, `https://[ip address]:3000`
- Within a new Chrome window or tab, go to robot's controller view, `https://[ip address]:3000/controller.html`

## Running the web app 
*coming soon*
