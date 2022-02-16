import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Input, Button } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import { noticeActions } from '../../../modules/notice';
import { useSelector } from '../../../modules';
import SelecRegion from '../../../common/components/SelcetRegion';
import { AddressType } from '../../../modules/types/notice';
import ImageButtons from '../../../common/components/ImageButtons';
import NoticeService from '../../../lib/api/noticeService';
import useImageUploader from '../../../common/hooks/useImageUploader';
import useImageDelete from '../../../common/hooks/useImageDelete';
import useSwalerts from '../../../common/hooks/useSwalerts';
import 'react-datepicker/dist/react-datepicker.css';

type NoticeActionType = 'setTitle' | 'setContent' | 'setOpenChat';

interface MatchParam {
  id: string;
}

const EditNotice: React.FC<RouteComponentProps<MatchParam>> = ({ match }) => {
  //* API
  const noticeService = new NoticeService();

  //* useState
  const enoughDeadLine = new Date();
  enoughDeadLine.setDate(enoughDeadLine.getDate() + 3);
  const [seletedDate, setSelectedDate] = useState(enoughDeadLine);
  const [timeOnOff, setTimeOnOff] = useState(true);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [previewImageFile, setPreviewImageFile] = useState<
    string | ArrayBuffer | null
  >();

  //* useRef
  const imageInputRef = useRef<HTMLInputElement>(null);

  const history = useHistory();
  //* Redux
  const dispatch = useDispatch();

  //* Redux State
  const {
    title,
    content,
    address,
    meetingTime,
    openChat,
    id,
    image,
    token,
    author,
  } = useSelector((state) => ({
    title: state.viewNotice.viewNoticeData.title,
    content: state.viewNotice.viewNoticeData.content,
    address: state.viewNotice.viewNoticeData.address,
    id: state.viewNotice.viewNoticeData.id,
    meetingTime: state.viewNotice.viewNoticeData.meetingTime,
    openChat: state.viewNotice.viewNoticeData.openChat,
    image: state.viewNotice.viewNoticeData.image,
    author: state.signIn.userData.nickName,
    token: state.signIn.token,
  }));

  //* custom hooks
  const { progress, imageUploader } = useImageUploader();
  const imageDelete = useImageDelete();
  const { customAlert, errorAlert, successAlert } = useSwalerts();

  //* event version
  const setPreviewImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImageFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const saveImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setImageUploadLoading(true);
      if (!e.target.files) return;
      const file = e.target.files[0];
      const location = imageUploader(file, 'boardImage');
      dispatch(noticeActions.setImage(location));

      // 미리보기 이미지
      setPreviewImage(file);
      setImageUploadLoading(false);
    } catch (error) {
      setImageUploadLoading(false);
      errorAlert(
        '이미지 업로드 실패',
        '이미지 업로드에 실패하였습니다. 다시 시도해주세요.😰'
      );
    }
  };
  const deleteImageFile = () => {
    try {
      setImageUploadLoading(true);
      const imageURLArr = image.split('/');
      const fileName = `${imageURLArr[imageURLArr.length - 2]}/${
        imageURLArr[imageURLArr.length - 1]
      }`;

      imageDelete(fileName);
      dispatch(noticeActions.setImage(''));
      // 미리보기 이미지
      setPreviewImageFile(null);
      setImageUploadLoading(false);
    } catch (error) {
      setImageUploadLoading(false);
      errorAlert(
        '이미지 삭제 실패',
        '이미지 삭제에 실패하였습니다. 다시 시도해주세요.😰'
      );
    }
  };

  const editImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setImageUploadLoading(true);
      if (!e.target.files) return;
      // 삭제
      if (image) {
        const imageURLArr = image.split('/');
        const fileName = `${imageURLArr[imageURLArr.length - 2]}/${
          imageURLArr[imageURLArr.length - 1]
        }`;
        imageDelete(fileName);
      }
      // 업로드
      const file = e.target.files[0];
      const location = imageUploader(file, 'boardImage');
      dispatch(noticeActions.setImage(location));

      // 미리보기 이미지
      setPreviewImage(file);
      setImageUploadLoading(false);
    } catch (error) {
      setImageUploadLoading(false);
      errorAlert(
        '이미지 변경 실패',
        '이미지 변경에 실패하였습니다. 다시 시도해주세요.😰'
      );
    }
  };

  const onChangeInputState = (
    e: React.ChangeEvent<FormElement>,
    actionName: NoticeActionType
  ) => dispatch(noticeActions[actionName](e.currentTarget.value));

  const onChangeSelectState = (region: AddressType) =>
    dispatch(noticeActions.setAddress(region));

  const onChangeDatePickderState = (date: string) =>
    dispatch(noticeActions.setMeetingTime(date));

  const editNotice = async () => {
    try {
      await noticeService.editNotice(id, token, {
        title,
        content,
        address,
        meetingTime,
        openChat,
        image,
        author,
      });
      await successAlert('수정 성공', '게시물을 성공적으로 변경하였습니다.');
      history.push(`/boards/run/${id}`);
    } catch (error) {
      await errorAlert('수정 실패', '게시물을 변경을 실패하였습니다.😰');
      history.push(`/boards/run/${id}`);
    }
  };

  const checkData = () => {
    [
      [openChat, '오픈 채팅 주소를 입력해주세요'],
      [content, '게시물 내용을 작성해주세요'],
      [address.si, '모든 주소를 선택해주세요'],
      [title, '제목을 작성해주세요'],
    ].forEach((str) => {
      const requireData = str[0];
      const alertText = str[1];
      if (!requireData) {
        customAlert({ title: `${alertText}` }).then(() => {
          return false;
        });
      }
    });
    if (openChat && content && address.si && title) return true;
    return false;
  };

  useEffect(() => {
    if (meetingTime) {
      setTimeOnOff(false);
    }
  }, []);

  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <form
          className="w-2/3 "
          onSubmit={(e) => {
            e.preventDefault();
            if (checkData()) {
              editNotice();
            }
          }}
        >
          <div className="mb-5">
            <Input
              underlined
              bordered
              type="text"
              placeholder="제목을 입력하세요"
              color="secondary"
              width="100%"
              size="xlarge"
              onChange={(e) => {
                onChangeInputState(e, 'setTitle');
              }}
              value={title}
              data-testid="title-input"
              className="text-2xl"
            />
          </div>
          <div className="md:flex md:justify-around space-y-5 mb-5">
            <div className="mt-10 w-full space-y-5">
              <div>
                <div className="flex flex-col w-full space-y-3">
                  <span className="whitespace-nowrap mr-5 font-bold inline-block">
                    모집 마감 시간
                  </span>
                  <div className="flex flex-col sm:flex-row justify-around items-center space-y-3 sm:space-y-0">
                    <div
                      className={`w-full sm:w-1/2 py-1 ${
                        !timeOnOff && 'pl-4'
                      } rounded border-solid border-2 border-indigo-400 flex justify-center`}
                    >
                      {timeOnOff ? (
                        <span>마감 제한 없음</span>
                      ) : (
                        <DatePicker
                          className="w-full"
                          selected={seletedDate}
                          onChange={(e) => {
                            setSelectedDate(e || new Date());
                            onChangeDatePickderState(
                              e ? e.toString() : new Date().toString()
                            );
                          }}
                          timeInputLabel="Time:"
                          dateFormat="yyyy/MM/dd hh:mm aa"
                          showTimeInput
                        />
                      )}
                    </div>
                    <div className="mr-2">
                      <Button
                        type="button"
                        color="#8b8bf5"
                        onClick={() => {
                          if (timeOnOff) {
                            dispatch(
                              noticeActions.setMeetingTime(
                                enoughDeadLine.toString()
                              )
                            );
                            setTimeOnOff(false);
                          }
                          if (!timeOnOff) {
                            dispatch(noticeActions.setMeetingTime(''));
                            setTimeOnOff(true);
                          }
                        }}
                      >
                        {timeOnOff ? '마감 제한 설정하기' : '마감 제한 없애기'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <span className="mr-5 font-bold mb-4">러닝 지역</span>
                <SelecRegion
                  submit={onChangeSelectState}
                  className="p-1 mx-1"
                  initRegion={address}
                />
              </div>
              <div>
                <span className="mr-5 w-full font-bold">오픈 채팅 링크</span>
                <Input
                  underlined
                  bordered
                  type="text"
                  width="100%"
                  placeholder="오픈 채팅 링크"
                  color="secondary"
                  onChange={(e) => {
                    onChangeInputState(e, 'setOpenChat');
                  }}
                  value={openChat}
                  style={{ fontSize: '1rem' }}
                  data-testid="openChatLink-input"
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-col justify-center items-center rounded border-solid border-2 border-indigo-400 h-60 w-60 mb-3">
                {image ? (
                  <img src={image as string} alt="map" className="w-full" />
                ) : (
                  <div className="h-ful w-full flex flex-col justify-center items-center text-indigo-400 space-y-2">
                    <span className="block">러닝 경로 지도를</span>
                    <span className="block">등록해주세요(필수X)</span>
                    <span className="block">(네이버지도 or 카카오 지도)</span>
                  </div>
                )}
              </div>
              <ImageButtons
                containerClassName="flex w-64"
                condition={image}
                deleteButtonEvent={deleteImageFile}
                deleteButtonName="사진 삭제"
                editButtonEvent={editImageFile}
                editButtonName="사진 변경"
                uploadButtonEvent={saveImageFile}
                uploadButtonName="러닝 사진 등록"
              />
            </div>
          </div>
          <div className="mb-20 md:mb-16">
            <ReactQuill
              theme="snow"
              defaultValue={content}
              onChange={(e) => {
                dispatch(noticeActions.setContent(e));
              }}
              style={{ height: '300px' }}
              data-testid="explain-input"
              placeholder="공지 설명글을 작성해주세요 : )"
            />
          </div>
          <div className="flex justify-end">
            <div className="w-3/12 flex flex-col mb-10">
              <Button
                auto
                color="#8b8bf5"
                type="submit"
                rounded
                data-testid="submit-button"
              >
                등록
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNotice;
