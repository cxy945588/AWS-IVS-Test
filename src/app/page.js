"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import {
  getDevices,
  handleMediaToggle,
  MIC,
  CAMERA,
} from "./utils/mediaDevices";
import {
  leaveStage,
  joinStage,
  createLocalStageStream,
} from "./utils/stageUtils";
import Header from "./components/Header";
import Input from "./components/Input";
import LocalParticipantVideo from "./components/LocalParticipantVideo";
import RemoteParticipantVideos from "./components/RemoteParticipantVideos";
import Select from "./components/Select";

export default function Home() {
  const [isInitializeComplete, setIsInitializeComplete] = useState(false);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedVideoDeviceId, setSelectedVideoDeviceId] = useState(null);
  const [selectedAudioDeviceId, setSelectedAudioDeviceId] = useState(null);
  const [participantToken, setParticipantToken] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [localParticipant, setLocalParticipant] = useState({});
  const stageRef = useRef(undefined);
  const strategyRef = useRef();
  const [isMicMuted, setIsMicMuted] = useState(true);
  const [isCameraHidden, setIsCameraHidden] = useState(false);

  const handleDeviceUpdate = async () => {
    try {
      const { videoDevices, audioDevices } = await getDevices();
      setVideoDevices(videoDevices);
      setSelectedVideoDeviceId(videoDevices[0]?.deviceId);
      setAudioDevices(audioDevices);
      setSelectedAudioDeviceId(audioDevices[0]?.deviceId);
    } catch (error) {
      console.error("設備更新時發生錯誤:", error);
    }
  };

  const initialize = async () => {
    handleDeviceUpdate();
    setIsInitializeComplete(true);
  };

  const updateLocalParticipantMedia = async () => {
    const { participant } = localParticipant;
    const newVideoStream = await createLocalStageStream(
      selectedVideoDeviceId,
      CAMERA
    );
    const newAudioStream = await createLocalStageStream(
      selectedAudioDeviceId,
      MIC
    );
    const updatedStreams = [newVideoStream, newAudioStream];
    const updatedParticipant = {
      participant,
      streams: updatedStreams,
    };
    setLocalParticipant(updatedParticipant);
    strategyRef.current.updateTracks(newAudioStream, newVideoStream);
    stageRef.current.refreshStrategy();
  };

  useEffect(() => {
    const isInitializingStreams =
      !strategyRef.current?.audioTrack && !strategyRef.current?.videoTrack;
    if (!isInitializeComplete || isInitializingStreams) return;
    if (localParticipant.streams) {
      updateLocalParticipantMedia();
    }
  }, [selectedVideoDeviceId, selectedAudioDeviceId]);

  return (
    <div>
      <Script
        src="https://web-broadcast.live-video.net/1.6.0/amazon-ivs-web-broadcast.js"
        onLoad={initialize}
      ></Script>
      <Header />
      <hr />
      
      <div className="info-box">
        <h4>📋 使用說明</h4>
        <ol>
          <li>在 AWS Console 創建一個 IVS Stage</li>
          <li>生成 Participant Token (需要同時選擇 publish 和 subscribe 權限)</li>
          <li>將 Token 貼到下方的輸入框</li>
          <li>選擇您的攝影機和麥克風</li>
          <li>點擊「加入舞台」開始串流</li>
        </ol>
      </div>

      <div className="row">
        <Select
          deviceType="攝影機"
          updateDevice={setSelectedVideoDeviceId}
          devices={videoDevices}
        />
        <Select
          deviceType="麥克風"
          updateDevice={setSelectedAudioDeviceId}
          devices={audioDevices}
        />
        <Input
          label="Participant Token"
          value={participantToken}
          onChange={setParticipantToken}
        />
        {isInitializeComplete && (
          <div className="button-container row">
            <button
              className="button"
              onClick={() =>
                joinStage(
                  isInitializeComplete,
                  participantToken,
                  selectedAudioDeviceId,
                  selectedVideoDeviceId,
                  setIsConnected,
                  setIsMicMuted,
                  setLocalParticipant,
                  setParticipants,
                  strategyRef,
                  stageRef
                )
              }
            >
              加入舞台
            </button>
            <button
              className="button"
              onClick={() => leaveStage(stageRef.current, setIsConnected)}
            >
              離開舞台
            </button>
          </div>
        )}
      </div>

      {isConnected && (
        <>
          <h3>本地參與者</h3>
          <LocalParticipantVideo
            localParticipantInfo={localParticipant}
            isInitializeComplete={isInitializeComplete}
            participantSize={participants.length}
          />
        </>
      )}

      {isConnected && (
        <div className="static-controls">
          <button
            onClick={() =>
              handleMediaToggle(MIC, stageRef.current, setIsMicMuted)
            }
            className="button"
          >
            {isMicMuted ? "取消靜音" : "靜音"}
          </button>
          <button
            onClick={() =>
              handleMediaToggle(CAMERA, stageRef, setIsCameraHidden)
            }
            className="button"
          >
            {isCameraHidden ? "顯示鏡頭" : "隱藏鏡頭"}
          </button>
        </div>
      )}

      {isConnected && (
        <>
          <h3>遠端參與者</h3>
          <div className="center">
            <RemoteParticipantVideos
              isInitializeComplete={isInitializeComplete}
              participants={participants}
              participantSize={participants.length}
            />
          </div>
        </>
      )}
    </div>
  );
}
