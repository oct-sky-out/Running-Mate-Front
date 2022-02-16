import useSwalerts from '../../../../common/hooks/useSwalerts';

type CheckNoticeDataType = {
  openChat: string;
  content: string;
  address: string;
  title: string;
};
const useCheckNoticeData = () => {
  const checkNoticeData = (data: CheckNoticeDataType) => {
    const { customAlert } = useSwalerts();
    [
      [data.openChat, '오픈 채팅 주소를 입력해주세요'],
      [data.content, '게시물 내용을 작성해주세요'],
      [data.address, '모든 주소를 선택해주세요'],
      [data.title, '제목을 작성해주세요'],
    ].forEach((str) => {
      const requireData = str[0];
      const alertText = str[1];
      if (!requireData) {
        customAlert({ title: `${alertText}` }).then(() => {
          return false;
        });
      }
    });
    if (data.openChat && data.content && data.address && data.title)
      return true;
    return false;
  };
  return checkNoticeData;
};

export default useCheckNoticeData;
