// app is what manages the application; BrowserWindow is used to create the app's desktop windows
const { app, BrowserWindow } = require("electron");

// set our current environment
process.env.NODE_ENV = "development";
// a variable to use to do a bool check on if we're in prod or dev
const isDev = process.env.NODE_ENV !== "production" ? true : false;
const isMac = process.platform === "darwin" ? true : false;

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "ImageShrink",
    width: 500,
    height: 600,
    icon: "./assets/icons/Icon_256x256.png",
    resizable: isDev ? true : false
  });

  mainWindow.loadFile(`${__dirname}/app/index.html`);
}

// use app object and call an event with on; when app is ready, call createMainWindow
app.on("ready", createMainWindow);

// quit the app on a mac when all windows are closed
// on macOS it is common for applications and their menu bar to stay active until the user
// explicitly quits with cmd + Q or via the dock > quit or via menu > quit (e.g. doesn't quit on x out)
// here we are using common mac behavior and not closing the app on x out
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

// on macOS it is common to re-create a window in the app when the dock
// icon is clicked and there are no other windows open
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
