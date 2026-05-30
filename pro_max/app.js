const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

client.on("connect", () => {
  client.subscribe("test", (err) => {
    if (err) {
      console.error("Error subscribing to topic:", err);
    }
  });
});

client.on("message", (topic, message) => {
    if(topic === "test") {
      renderUI(JSON.parse(message.toString()));
    }
});

function renderUI(data) {
  let Sardine = 0;
  let tofu = 0;

  
  let objList = data.DeepDetect.obj_count;

  objList.forEach(obj => {
    if (obj.name === "Sardine") {
      Sardine = obj.count;
    }
    else if (obj.name === "tofu"){
      tofu = obj.count;
    }
  });

  if (Sardine === 1) {
    document.getElementById("img").src = "Sardine.png";
  }
  else if(tofu === 1)[
    document.getElementById("img").src = ""
  ]

}

