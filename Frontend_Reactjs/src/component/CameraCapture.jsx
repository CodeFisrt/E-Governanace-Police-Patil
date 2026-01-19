import { useRef, useState } from "react";

export default function CameraCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [mode, setMode] = useState("");
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [recording, setRecording] = useState(false);

  // ✅ OPEN CAMERA WITH LIVE PREVIEW
  const openCamera = async (type) => {
    try {
      setMode(type);

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: type === "video",
      });

      setStream(mediaStream);

      // 👇 IMPORTANT PART
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play(); // <-- force play
      }
    } catch (err) {
      alert("Camera permission denied");
      console.error(err);
    }
  };

  // 📸 CAPTURE PHOTO
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    setPhoto(canvas.toDataURL("image/png"));
    stopCamera();
  };

  // 🎥 START RECORDING
  const startRecording = () => {
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    let chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/mp4" });
      setVideo(URL.createObjectURL(blob));
    };

    recorder.start();
    setRecording(true);
  };

  // ⏹ STOP RECORDING
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
    stopCamera();
  };

  // 🛑 STOP CAMERA
  const stopCamera = () => {
    stream.getTracks().forEach((track) => track.stop());
    setStream(null);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="font-semibold mb-4">Upload Photo / Video</h2>

      {/* Buttons */}
      <div className="flex gap-6">
        <button
          onClick={() => openCamera("photo")}
          className="border-2 border-dashed rounded-xl p-6 w-60 hover:border-blue-500"
        >
          📷 Take Photo
        </button>

        <button
          onClick={() => openCamera("video")}
          className="border-2 border-dashed rounded-xl p-6 w-60 hover:border-blue-500"
        >
          🎥 Record Video
        </button>
      </div>

      {/* 🔴 LIVE CAMERA PREVIEW */}
      {stream && (
        <div className="mt-6">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full max-w-md rounded-lg border"
          />

          {mode === "photo" && (
            <button
              onClick={capturePhoto}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Capture Photo
            </button>
          )}

          {mode === "video" && (
            <button
              onClick={recording ? stopRecording : startRecording}
              className={`mt-4 px-4 py-2 rounded text-white ${
                recording ? "bg-red-600" : "bg-green-600"
              }`}
            >
              {recording ? "Stop Recording" : "Start Recording"}
            </button>
          )}
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {/* Preview */}
      {photo && <img src={photo} className="mt-6 w-64 rounded" />}
      {video && <video src={video} controls className="mt-6 w-80" />}
    </div>
  );
}
