import Video from "./Video";

const RemoteParticipantVideos = ({
  isInitializeComplete,
  participants,
  participantSize,
}) => {
  if (!isInitializeComplete) return;

  return participants
    ?.filter(
      (participantAndStreamInfo) =>
        !participantAndStreamInfo.participant.isLocal
    )
    .map((participantAndStreamInfo, index) => {
      const { participant, streams } = participantAndStreamInfo;
      const { username } = participant?.attributes || {};
      let streamsToDisplay = streams;

      return (
        <div className="participant-container" key={participant?.id}>
          <Video
            className="remote-participant-video"
            participant={participant}
            streamsToDisplay={streamsToDisplay}
            username={username}
            participantSize={index + 1}
            key={participant?.id}
          />
        </div>
      );
    });
};

export default RemoteParticipantVideos;
