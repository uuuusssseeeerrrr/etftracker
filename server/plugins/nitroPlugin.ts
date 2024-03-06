export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook("error", async (error, { event }) => {
        console.error(`${event?.path} Application error:`, error)
    });

    nitroApp.hooks.hook("request", (event) => {
        console.log("on request", event.path);
    });
});