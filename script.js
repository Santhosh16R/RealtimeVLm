// script.js
import { pipeline } from '@xenova/transformers';

// Set up the pipeline for image-to-text
let pipe;

async function loadPipeline() {
  pipe = await pipeline('image-to-text', 'apple/FastVLM-0.5B');
  console.log("FastVLM pipeline loaded.");
}

// Start the webcam and process frames
async function startWebcam() {
  const video = document.getElementById('webcam');
  const output = document.getElementById('output');

  if (navigator.mediaDevices.getUserMedia) {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    
    // Process a new frame when the video is ready
    video.onloadedmetadata = () => {
      video.play();
      processFrame(video, output);
    };
  } else {
    output.innerText = "getUserMedia not supported on your browser!";
  }
}

// Function to process a single frame and update the output
async function processFrame(video, outputDiv) {
  if (pipe) {
    // Generate a description from the current video frame
    const result = await pipe(video);
    
    // The result is an array with the generated text
    if (result && result.length > 0) {
      outputDiv.innerText = result[0].generated_text;
    }
  }
  
  // Use requestAnimationFrame for a smooth, continuous loop
  requestAnimationFrame(() => processFrame(video, outputDiv));
}

// Load the model and then start the process
loadPipeline().then(() => {
  startWebcam();
});
