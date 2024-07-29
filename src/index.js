import { createApp } from "@deroll/app";
import { hexToString } from "viem";
import { LandController } from "./src/controller/land";

const app = createApp({ url: process.env.ROLLUP_HTTP_SERVER_URL || "http://127.0.0.1:5004" });
const landController = new LandController();

app.addAdvanceHandler(async ({ metadata, payload }) => {
    const payloadString = hexToString(payload);
    console.log("Received advance payload:", payloadString);
    const jsonPayload = JSON.parse(payloadString);
    const sender = metadata.msg_sender;
    const action = jsonPayload.method;
    const data = jsonPayload.data;

    try {
        let response;
        switch (action) {
            case "createLand":
                response = await landController.createLand(data, sender);
                break;
            case "saleLand":
                response = await landController.saleLand(data, sender);
                break;
            case "putLandOnSale":
                response = await landController.putLandOnSale(data, sender);
                break;
            case "removeLandFromSale":
                response = await landController.removeLandFromSale(data, sender);
                break;
            case "updateLandDetails":
                response = await landController.updateLandDetails(data, sender);
                break;
            default:
                response = { error: `Unknown action: ${action}` };
                break;
        }
        console.log("Action response:", response);
        return "accept";
    } catch (error) {
        console.error("Error handling advance:", error);
        return "reject";
    }
});

app.addInspectHandler(async ({ payload }) => {
    const payloadString = hexToString(payload);
    console.log("Received inspect payload:", payloadString);
    const jsonPayload = JSON.parse(payloadString);
    const action = jsonPayload.method;
    const data = jsonPayload.data;

    try {
        let response;
        switch (action) {
            case "getLandDetails":
                response = await landController.getLandDetails(data);
                break;
            case "getAllLand":
                response = await landController.getAllLand();
                break;
            default:
                response = { error: `Unknown action: ${action}` };
                break;
        }
        console.log("Inspect response:", response);
        return response;
    } catch (error) {
        console.error("Error handling inspect:", error);
        return { error: error.message };
    }
});

app.start().catch((e) => {
    console.error(e);
    process.exit(1);
});
