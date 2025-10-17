import { getMediaForDevices, CAMERA, MIC } from "./mediaDevices";

/**
 * 創建本地舞台流
 */
export const createLocalStageStream = async (deviceId, deviceType) => {
  const { LocalStageStream } = IVSBroadcastClient;

  if (!deviceId) {
    console.warn("嘗試使用 null 設備 ID 設置本地媒體");
    return;
  }

  const newDevice = await getMediaForDevices(deviceId, deviceType);
  const stageStream =
    deviceType === CAMERA
      ? new LocalStageStream(newDevice.getVideoTracks()[0])
      : new LocalStageStream(newDevice.getAudioTracks()[0]);

  return stageStream;
};

/**
 * 設置策略
 */
const setupStrategy = (isInitializeComplete) => {
  if (!isInitializeComplete) {
    return;
  }

  const { SubscribeType } = IVSBroadcastClient;

  const strategy = {
    audioTrack: undefined,
    videoTrack: undefined,
    
    updateTracks(newAudioTrack, newVideoTrack) {
      this.audioTrack = newAudioTrack;
      this.videoTrack = newVideoTrack;
    },
    
    stageStreamsToPublish() {
      return [this.audioTrack, this.videoTrack];
    },
    
    shouldPublishParticipant(participant) {
      return true;
    },
    
    shouldSubscribeToParticipant(participant) {
      return SubscribeType.AUDIO_VIDEO;
    },
  };

  return strategy;
};

/**
 * 加入舞台
 */
export const joinStage = async (
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
) => {
  const { Stage, StageEvents, ConnectionState } = IVSBroadcastClient;

  if (!isInitializeComplete) return;

  const cameraStageStream = await createLocalStageStream(
    selectedVideoDeviceId,
    CAMERA
  );
  const micStageStream = await createLocalStageStream(
    selectedAudioDeviceId,
    MIC
  );

  const strategy = setupStrategy(isInitializeComplete);
  strategy.updateTracks(micStageStream, cameraStageStream);
  strategyRef.current = strategy;

  let stage = new Stage(participantToken, strategyRef.current);

  // 監聽連接狀態變化
  stage.on(StageEvents.STAGE_CONNECTION_STATE_CHANGED, (state) => {
    setIsConnected(state === ConnectionState.CONNECTED);
    micStageStream.setMuted(true);
    setIsMicMuted(true);
  });

  // 監聽參與者流添加
  stage.on(
    StageEvents.STAGE_PARTICIPANT_STREAMS_ADDED,
    (participant, streams) => {
      console.log("參與者媒體已添加: ", participant, streams);

      if (participant.isLocal) {
        setLocalParticipant({ participant, streams });
      }

      setParticipants((prevParticipants) => {
        const participantExists = prevParticipants.some(
          (participantObj) => participantObj.participant.id === participant.id
        );
        if (!participantExists) {
          return [...prevParticipants, { participant, streams }];
        } else {
          return prevParticipants;
        }
      });
    }
  );

  // 監聽參與者離開
  stage.on(StageEvents.STAGE_PARTICIPANT_LEFT, (participant) => {
    console.log("參與者離開: ", participant);
    setParticipants((prevParticipants) => {
      const filteredParticipants = prevParticipants.filter(
        ({ participant: currentParticipant }) => {
          return currentParticipant.id !== participant.id;
        }
      );
      return [...filteredParticipants];
    });
  });

  try {
    await stage.join();
  } catch (err) {
    console.error("加入舞台時發生錯誤:", err);
    stage = null;
  }

  stageRef.current = stage;
};

/**
 * 離開舞台
 */
export const leaveStage = async (stage, setIsConnected) => {
  if (stage) {
    await stage.leave();
    setIsConnected(false);
  }
};
