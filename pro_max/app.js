

const img = document.getElementById("img");

const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

client.on("connect", () => {
    console.log("✅ Connected to broker");

    client.subscribe("test123", (err) => {
        if (err) {
            console.error("❌ Subscribe error:", err);
           
        } else {
            console.log("✅ Subscribed to test");
        }
    });
});

client.on("error", (err) => {
    console.error("❌ MQTT Error:", err);

});

client.on("offline", () => {
    console.log("⚠️ MQTT Offline");

});

client.on("message", (topic, message) => {

    const raw = message.toString();

    console.log("RAW:", raw);

    let data;

    // SAFE PARSING (prevents invalid JSON crash)
    try {
        data = JSON.parse(raw);
    } catch (e) {
        console.log("⚠️ Not JSON, treating as text");

        data = {
            payload: raw
        };
    }

    console.log("PARSED DATA:", data);

    // CHECK VALUE
    if (data.payload === "Sardine") {

        console.log("🐟 Sardine detected!");

        img.src = "Sardine.png";
        img.style.display = "block";

    }
    else if (data.payload === "Tofu"){
     
      img.src = "Tofu.png";
      img.style.display = "block";
    }
});