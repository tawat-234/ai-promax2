const img = document.getElementById("img");


img.classList.remove("fade-in");

img.src = "wait.png";
img.style.display = "block";


let isSpeaking = false;
let lastName = "";
let clearTimer = null;


const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

client.on("connect", () => {
    console.log("✅ Connected to broker");

    client.subscribe("poy0859156151", (err) => {
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

async function sendToPython(word){

    console.log("Sending:", word);

    try {

        const response = await fetch("http://127.0.0.1:5000/speak", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                message:word
            })
        });

        const data = await response.json();

        console.log(data);


        if(data.status === "finished"){


          img.classList.remove("fade-in");
          img.classList.add("fade-out");


          await new Promise(resolve => setTimeout(resolve, 1000));


          img.classList.remove("fade-out");

          img.src = "wait.png";

          img.onload = () => {img.classList.add("fade-in");};

            console.log("Speech finished");

            // รอ 5 วินาที
            await new Promise(resolve => setTimeout(resolve, 5000));

            console.log("Ready again");



            isSpeaking = false;
        }


    } catch(error){

        console.error(error);

        isSpeaking = false;
    }
}


client.on("message", async (topic, message) => {

    const data = JSON.parse(message.toString());

    const name = data?.DeepDetect?.obj_count?.[0]?.name;


    if(isSpeaking) return;


    if(name === "sardine"){

     console.log("SARDINE DETECTED");

     isSpeaking = true;

     img.classList.remove("fade-out");
     void img.offsetWidth;

     img.classList.remove("fade-out");
     img.classList.remove("fade-in");

     void img.offsetWidth;

     img.src = "Sardinenew.png";

     img.onload = () => {img.classList.add("fade-in");};

     // กรณีรูปถูก cache แล้ว
     if (img.complete) {
        img.classList.add("fade-in");
     } 

     console.log("Image changed:", img.src);

     await sendToPython("sardine");
    }

});