// // The following code snippet demonstrates how to use Groq API to translate an audio file in JavaScript:

// import fs from "fs";
// import Groq from "groq-sdk";

// // Initialize the Groq client
// const groq = new Groq();
// async function main() {
//   // Create a translation job
//   const translation = await groq.audio.translations.create({
//     file: fs.createReadStream("sample_audio.m4a"), // Required path to audio file - replace with your audio file!
//     model: "whisper-large-v3", // Required model to use for translation
//     prompt: "Specify context or spelling", // Optional
//     language: "en", // Optional ('en' only)
//     response_format: "json", // Optional
//     temperature: 0.0, // Optional
//   });
//   // Log the transcribed text
//   console.log(translation.text);
// }
// main();

// // The following code snippet demonstrates how to use Groq API to transcribe an audio file in JavaScript:

// import fs from "fs";
// import Groq from "groq-sdk";

// // Initialize the Groq client
// const groq = new Groq();

// async function main() {
//   // Create a transcription job
//   const transcription = await groq.audio.transcriptions.create({
//     file: fs.createReadStream("YOUR_AUDIO.wav"), // Required path to audio file - replace with your audio file!
//     model: "whisper-large-v3-turbo", // Required model to use for transcription
//     prompt: "Specify context or spelling", // Optional
//     response_format: "verbose_json", // Optional
//     timestamp_granularities: ["word", "segment"], // Optional (must set response_format to "json" to use and can specify "word", "segment" (default), or both)
//     language: "en", // Optional
//     temperature: 0.0, // Optional
//   });
//   // To print only the transcription text, you'd use console.log(transcription.text); (here we're printing the entire transcription object to access timestamps)
//   console.log(JSON.stringify(transcription, null, 2));
// }
// main();

// // Text to Speech

// import fs from "fs";
// import path from "path";
// import Groq from 'groq-sdk';

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY
// });

// const speechFilePath = "speech.wav";
// const model = "playai-tts";
// const voice = "Fritz-PlayAI";
// const text = "I love building and shipping new features for our users!";
// const responseFormat = "wav";

// async function main() {
//   const response = await groq.audio.speech.create({
//     model: model,
//     voice: voice,
//     input: text,
//     response_format: responseFormat
//   });
  
//   const buffer = Buffer.from(await response.arrayBuffer());
//   await fs.promises.writeFile(speechFilePath, buffer);
// }

// main();

// // The playai-tts model currently supports 19 English voices that you can pass into the voice parameter (Arista-PlayAI, Atlas-PlayAI, Basil-PlayAI, Briggs-PlayAI, Calum-PlayAI, Celeste-PlayAI, Cheyenne-PlayAI, Chip-PlayAI, Cillian-PlayAI, Deedee-PlayAI, Fritz-PlayAI, Gail-PlayAI, Indigo-PlayAI, Mamaw-PlayAI, Mason-PlayAI, Mikail-PlayAI, Mitch-PlayAI, Quinn-PlayAI, Thunder-PlayAI).

// // Reasoning

// import Groq from 'groq-sdk';

// const client = new Groq();
// const completion = await client.chat.completions.create({
//     model: "deepseek-r1-distill-llama-70b",
//     messages: [
//         {
//             role: "user",
//             content: "How many r's are in the word strawberry?"
//         }
//     ],
//     temperature: 0.6,
//     max_completion_tokens: 1024,
//     top_p: 0.95,
//     stream: true,
//     reasoning_format: "raw"
// });

// for await (const chunk of completion) {
//     process.stdout.write(chunk.choices[0].delta.content || "");
// }

// // Vision

// import { Groq } from 'groq-sdk';

// const groq = new Groq();
// async function main() {
//   const chatCompletion = await groq.chat.completions.create({
//     "messages": [
//       {
//         "role": "user",
//         "content": [
//           {
//             "type": "text",
//             "text": "What's in this image?"
//           },
//           {
//             "type": "image_url",
//             "image_url": {
//               "url": "https://upload.wikimedia.org/wikipedia/commons/f/f2/LPU-v1-die.jpg"
//             }
//           }
//         ]
//       }
//     ],
//     "model": "meta-llama/llama-4-scout-17b-16e-instruct",
//     "temperature": 1,
//     "max_completion_tokens": 1024,
//     "top_p": 1,
//     "stream": false,
//     "stop": null
//   });

//    console.log(chatCompletion.choices[0].message.content);
// }

// main();

// // Agentic Tooling

// import Groq from "groq-sdk";

// const groq = new Groq();

// export async function main() {
//     const completion = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "user",
//           content: "What is the current weather in Tokyo?",
//         },
//       ],
//       // Change model to compound-beta to use agentic tooling
//       // model: "llama-3.3-70b-versatile",
//       model: "compound-beta",
//     });

//     console.log(completion.choices[0]?.message?.content || "");
//     // Print all tool calls
//     // console.log(completion.choices[0]?.message?.tool_calls || "");
// }

// main();

// // ------------------------------------------------------------

// import Groq from "groq-sdk";

// const groq = new Groq();

// export async function main() {
//   const user_query = "What were the main highlights from the latest Apple keynote event?"
//   // Or: "What's the current weather in San Francisco?"
//   // Or: "Summarize the latest developments in fusion energy research this week."

//   const completion = await groq.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: user_query,
//       },
//     ],
//     // The *only* change needed: Specify the compound model!
//     model: "compound-beta",
//   });

//   console.log(`Query: ${user_query}`);
//   console.log(`Compound Beta Response:\n${completion.choices[0]?.message?.content || ""}`);

//   // You might also inspect chat_completion.choices[0].message.tool_calls
//   // if you want to see if/which tool was used, though it's not necessary.
// }

// main();

// // --------------------------------------------------------------------------

// import Groq from "groq-sdk";

// const groq = new Groq();

// export async function main() {
//   // Example 1: Calculation
//   const computationQuery = "Calculate the monthly payment for a $30,000 loan over 5 years at 6% annual interest.";

//   // Example 2: Simple code execution
//   const codeQuery = "What is the output of this Python code snippet: `data = {'a': 1, 'b': 2}; print(data.keys())`";

//   // Choose one query to run
//   const selectedQuery = computationQuery;

//   const completion = await groq.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: "You are a helpful assistant capable of performing calculations and executing simple code when asked.",
//       },
//       {
//         role: "user",
//         content: selectedQuery,
//       }
//     ],
//     // Use the compound model
//     model: "compound-beta-mini",
//   });

//   console.log(`Query: ${selectedQuery}`);
//   console.log(`Compound Beta Response:\n${completion.choices[0]?.message?.content || ""}`);
// }

// main();

// // ---------------------------------------------------------------------------------------

// import Groq from "groq-sdk";

// const groq = new Groq();

// export async function main() {
//   // Example 1: Error Explanation (might trigger search)
//   const debugQuerySearch = "I'm getting a 'Kubernetes CrashLoopBackOff' error on my pod. What are the common causes based on recent discussions?";

//   // Example 2: Code Check (might trigger code execution)
//   const debugQueryExec = "Will this Python code raise an error? `import numpy as np; a = np.array([1,2]); b = np.array([3,4,5]); print(a+b)`";

//   // Choose one query to run
//   const selectedQuery = debugQueryExec;

//   const completion = await groq.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: "You are a helpful coding assistant. You can explain errors, potentially searching for recent information, or check simple code snippets by executing them.",
//       },
//       {
//         role: "user",
//         content: selectedQuery,
//       }
//     ],
//     // Use the compound model
//     model: "compound-beta-mini",
//   });

//   console.log(`Query: ${selectedQuery}`);
//   console.log(`Compound Beta Response:\n${completion.choices[0]?.message?.content || ""}`);
// }

// main();

// // -------------------------------------------------------------------------------------------------------

