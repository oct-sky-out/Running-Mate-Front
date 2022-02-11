import { useSelector } from '../../../modules';

const CrewDetailInformation = () => {
  const { crewName, explanation, openChat } = useSelector((state) => ({
    crewName: state.crew.crewName,
    explanation: state.crew.explanation,
    openChat: state.crew.openChat,
  }));
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <img
          // 이미지 추가되면 여기에 코드 작성
          src=""
          alt=""
          className="w-48 rounded-full border-4 border-purple "
        />
      </div>
      <div className="text-2xl">{crewName}</div>
      <div className="text-lg">
        <span>{explanation}</span>
      </div>
      <div className="text-lg">
        <span>
          <a href={openChat} target="_blank" rel="noreferrer">
            오픈 채팅 : {openChat}
          </a>
        </span>
      </div>
    </>
  );
};

export default CrewDetailInformation;
