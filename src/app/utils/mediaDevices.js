export const CAMERA = "camera";
export const MIC = "mic";

/**
 * 獲取所有可用的媒體設備
 */
export const getDevices = async () => {
  // 先請求權限,防止 Safari/FF 上設備列表為空
  await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  const devices = await navigator.mediaDevices.enumerateDevices();

  // 獲取所有視訊設備
  const videoDevices = devices.filter((d) => d.kind === "videoinput");
  if (!videoDevices.length) {
    console.error("未找到視訊設備");
  }

  // 獲取所有音訊設備
  const audioDevices = devices.filter((d) => d.kind === "audioinput");
  if (!audioDevices.length) {
    console.error("未找到音訊設備");
  }

  return { videoDevices, audioDevices };
};

/**
 * 根據設備 ID 和類型獲取媒體流
 * @param {string} deviceId - 設備 ID
 * @param {string} mediaType - 媒體類型 (CAMERA 或 MIC)
 * @returns {Promise<MediaStream>} - 媒體流
 */
export const getMediaForDevices = async (deviceId, mediaType) => {
  const mediaConstraints = {
    video: {
      deviceId: mediaType === CAMERA && deviceId ? { exact: deviceId } : null,
    },
    audio: {
      deviceId: mediaType === MIC && deviceId ? { exact: deviceId } : null,
    },
  };
  return navigator.mediaDevices.getUserMedia(mediaConstraints);
};

/**
 * 切換媒體設備的靜音/隱藏狀態
 */
export const handleMediaToggle = (deviceType, stageRef, setIsDeviceStopped) => {
  if (deviceType === CAMERA) {
    const { videoStream } = stageRef.current.localParticipant;
    const isHidden = videoStream.isMuted;
    videoStream.setMuted(!isHidden);
    setIsDeviceStopped(!isHidden);
  } else if (deviceType === MIC) {
    const { audioStream } = stageRef.current.localParticipant;
    const isMuted = audioStream.isMuted;
    audioStream.setMuted(!isMuted);
    setIsDeviceStopped(!isMuted);
  }
};
