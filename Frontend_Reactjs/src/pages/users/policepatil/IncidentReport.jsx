import React from "react";
import UsersNavbar from "../../../component/UsersNavbar";
import { useState, useRef } from "react";
import Location from "../../../component/Location";

function IncidentReport() {
  const [severity, setSeverity] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");

  const [stream, setStream] = useState(null);
  const [mode, setMode] = useState("");
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [recording, setRecording] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  // 📤 SUBMIT INCIDENT REPORT
  const submitIncidentReport = async () => {
    if (!severity || !incidentType || !description) {
      alert("Please fill all required fields!");
      return;
    }

    setSubmitting(true);

    try {
      // Create notification object
      const notification = {
        id: Date.now(),
        type: "incident",
        title: "Incident Report Submitted",
        message: `Your incident report (${incidentType}) has been successfully submitted.`,
        severity: severity,
        timestamp: new Date().toISOString(),
        isRead: false,
      };

      // Get existing notifications from localStorage
      const existingNotifications = localStorage.getItem("notifications");
      const notifications = existingNotifications ? JSON.parse(existingNotifications) : [];

      // Add new notification
      notifications.push(notification);
      localStorage.setItem("notifications", JSON.stringify(notifications));

      setSuccessMessage("✓ Incident Report Submitted Successfully!");
      
      // Reset form
      setTimeout(() => {
        setSeverity("");
        setIncidentType("");
        setDescription("");
        setPhoto(null);
        setVideo(null);
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error submitting incident report:", error);
      alert("Error submitting incident report. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <UsersNavbar incidentNavbar={true} />

      <div className="flex flex-col gap-5  justify-center font-sans items-center align-middle p-5  border border-1 w-1/2 m-auto ">
        {/* Severity */}
        <div className="align-baseline items-start text-start w-full ">
          <p>severit</p>
          <div className="grid grid-cols-3 gap-2 w-full">
            <button
              onClick={() => {
                setSeverity("High");
              }}
              className={`border-3 border-gray-300 rounded p-4 font-bold ${
                severity == "High" ? "bg-red-700 " : "bg-gray-200"
              }`}
            >
              High
            </button>

            <button
              onClick={() => {
                setSeverity("Medium");
              }}
              className={`border-3 border-gray-300 rounded p-4 font-bold ${
                severity == "Medium" ? "bg-amber-600" : " bg-gray-200"
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => {
                setSeverity("Low");
              }}
              className={`border-3 border-gray-300 rounded p-4 font-bold ${
                severity == "Low" ? "bg-green-600" : "bg-gray-200"
              }`}
            >
              Low
            </button>
          </div>
        </div>
        {/* Incident Type */}
        <div className="flex flex-col gap-2  items-start items-start align-baseline w-full   justify-start content-start border-gray-300 rounded ">
          <label htmlFor="">Incident Type</label>
          <select
            value={incidentType}
            onChange={(e) => setIncidentType(e.target.value)}
            className="grid gap-2 p-2 w-full border border-gray-300 rounded"
            name=""
            id=""
          >
            <option value="">Select Category</option>
            <option value="Meeting">Meeting</option>
            <option value="Awareness">Awareness</option>
            <option value="Dispute Resolution">Dispute Resolution</option>
            <option value="Surveillance">Surveillance</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* discription */}
        <div className="grid w-full gap-2 ">
          <label htmlFor="descriptions">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="descriptions"
            placeholder="Add your descriptions..."
            rows={5}
            cols={50}
            className="border-2 border-gray-300 rounded "
          ></textarea>
        </div>

        {/* Location */}

        <div className="w-full">
          <Location />
        </div>

        {/* Photo & Video */}

        <div className="w-full">
          <h2 className="">Upload Photo / Video</h2>

          {/* Buttons */}
          <div className="flex p-5 justify-around gap-5">
            <button
              onClick={() => openCamera("photo")}
              className=" grid border-2 border-dashed justify-center rounded-xl p-6 w-full hover:border-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-camera w-8 h-8 text-muted-foreground"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                <circle cx="12" cy="13" r="3"></circle>
              </svg>{" "}
              Take Photo
            </button>

            <button
              onClick={() => openCamera("video")}
              className="grid border-2 border-dashed rounded-xl p-6 w-full justify-center  hover:border-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-video w-8 h-8 text-muted-foreground"
              >
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                <rect x="2" y="6" width="14" height="12" rx="2"></rect>
              </svg>{" "}
              Record Video
            </button>
          </div>

          {/*  LIVE CAMERA PREVIEW */}
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

        <div className="  grid grid-cols-2 w-full   bord bg-gray-200 rounded-2xl ">
          <div className=" w-full flex p-5  items-start align-middle gap-2">
            {" "}
            <div className="flex justify-center items-center align-middle content-center h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-file-warning w-5 h-5 text-primary"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>{" "}
            </div>
            <div>
              {" "}
              <div>Recommend FIR</div>
              <div>Recommend FIR for serious cases</div>
            </div>
          </div>

          <div className="  flex justify-end-safe mr-2">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultValue=""
                className="sr-only peer"
                defaultChecked=""
              />
              <div className="relative w-9 h-5 peer-first:bg-gray-400 peer-checked:bg-blue-950   peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all " />
            </label>
          </div>
        </div>

        {successMessage && (
          <div className="flex w-full p-3 justify-center items-center gap-2 text-white font-bold bg-green-600 rounded-2xl">
            {successMessage}
          </div>
        )}

        <div className=" flex w-full p-3 justify-center text-white font-bold bg-red-700 rounded-2xl hover:bg-red-800 transition disabled:opacity-50">
          <button
            onClick={submitIncidentReport}
            disabled={submitting}
            className="flex gap-2 justify-center items-center w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-triangle-alert w-5 h-5"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
            {submitting ? "Submitting..." : "Submit Incident Report"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncidentReport;
