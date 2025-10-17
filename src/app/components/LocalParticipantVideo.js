import Video from "./Video";

const LocalParticipantVideo = ({
  isInitializeComplete,
  localParticipantInfo,
  participantSize,
}) => {
  if (!isInitializeComplete) return;

  const { participant, streams } = localParticipantInfo;
  const { username } = participant?.attributes || {};
  
  let streamsToDisplay = streams;
  if (typeof IVSBroadcastClient !== 'undefined') {
    const { StreamType } = IVSBroadcastClient;
    streamsToDisplay = streams?.filter(
      (stream) => stream?.streamType === StreamType?.VIDEO
    );
  }

  return (
    <div className="video-container">
      <div className="column">
        <Video
          className="local-video"
          participant={participant}
          streamsToDisplay={streamsToDisplay}
          username={username}
          participantSize={participantSize}
        />
      </div>
    </div>
  );
};

export default LocalParticipantVideo;
