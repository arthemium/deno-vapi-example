import Vapi from '../web/vapi.ts';
import { useState } from 'preact/hooks';

const vapi = new Vapi('xx');

let customerIssue: any[] = [];

const createTask = async (data: any[]) => {
  const newTask = await fetch('http://localhost:8000/api/newtask', {
      method: "POST",
      body: JSON.stringify(data),
  });
  console.log(newTask)
}

const prompt = `You are frontline support agent, you name is Sophie. \
\ you should focus on asking the customer two main questions. 
\ what is the issue they are facing and collect the OS, system parameters and when the issue started
\ try to give the customer few advices, however, be short and if it doesn't help, pass it to backline support.
\ try to sounds as human as possible, possibly adding 'um' or very short pauses so it will look like you are thinking.
`

const startConvo = async () => {
    console.log("starting convo!")
    vapi.start({
        model: {
          provider: "openai",
          model: "gpt-3.5-turbo",
          systemPrompt: prompt
        },
         voice: {
          provider: "deepgram",
          voiceId: "luna",
        },
      });
}

const endCall = async () => {
  vapi.stop();
}

vapi.on('message', (message) => {
  if(message.role === 'user' && message.type === 'transcript' && message.transcriptType === 'final')  {
    console.log(message);
    customerIssue.push(message.transcript);
  }
  });

  vapi.on('call-end', () => {
    createTask(customerIssue);
  })

export default function VapiButton() {
    const [volumeLevel, setVolumeLevel] = useState(1);
    vapi.on('call-end', () => {
      setVolumeLevel(1);
    })
    vapi.on('volume-level', (volume) => {
      const correctedVolume = volume * 10;
      const finalVolume = correctedVolume < 1 ? 1 : Math.round(correctedVolume) * 0.1;
      setVolumeLevel(finalVolume);
    });
    
    return (
      <div className="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-6">
      <div className="mt-3 rounded-lg sm:mt-0">
        <button className="px-5 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-green-600 lg:px-10 rounded-xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={startConvo}>Start Call</button>
      </div>
      <div className="mt-3 rounded-lg sm:mt-0 sm:ml-3">
        <button className="items-center block px-5 lg:px-10 py-3.5 text-base font-medium text-center text-red-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={endCall}>End Call</button>
      </div>


      <div>

      <span className={`relative flex h-7 w-7`}>
      <span className="animate-wiggle absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-30" style={{'--scaleAmount': `${volumeLevel * 1.2}` }}></span>
      <span className="animate-wiggle absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" style={{'--scaleAmount': `${volumeLevel}` }}></span>
      </span>
      </div>
    </div>
      );
  }
  
