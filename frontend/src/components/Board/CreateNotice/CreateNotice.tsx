import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import { Input, Button } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from '../../../modules';
import { CreateNoticeActions } from '../../../modules/createNotice';
import SelecRegion from '../../../common/components/SelcetRegion';
import ImageButtons from '../../../common/components/ImageButtons';
import NoticeService from '../../../lib/api/noticeService';
import useImageUploader from '../../../common/hooks/useImageUploader';
import useImageDelete from '../../../common/hooks/useImageDelete';
import useSwalerts from '../../../common/hooks/useSwalerts';
import { AddressType } from '../../../modules/types/notice';

type CreacteNoticeActionType = 'setTitle' | 'setContent' | 'setOpenChat';

const CreateNotice = () => {
  //* API
  const noticeService = new NoticeService();

  //* useHistory
  const history = useHistory();

  //* useState
  const enoughDeadLine = new Date();
  enoughDeadLine.setDate(enoughDeadLine.getDate() + 3);
  const [seletedDate, setSelectedDate] = useState(enoughDeadLine);
  const [timeOnOff, setTimeOnOff] = useState(true);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [previewImageFile, setPreviewImageFile] = useState<
    string | ArrayBuffer | null
  >();

  //* Redux
  const dispatch = useDispatch();

  //* Redux State
  const {
    title,
    content,
    address,
    meetingTime,
    openChat,
    image,
    token,
    author,
  } = useSelector((state) => ({
    title: state.createNotice.title,
    content: state.createNotice.content,
    address: state.createNotice.address,
    meetingTime: state.createNotice.meetingTime,
    openChat: state.createNotice.openChat,
    image: state.createNotice.image,
    author: state.signIn.userData.nickName,
    token: state.signIn.token,
  }));

  //* custom Hook
  const { progress, imageUploader } = useImageUploader();
  const imageDelete = useImageDelete();
  const { customAlert, errorAlert, successAlert } = useSwalerts();

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
      dispatch(CreateNoticeActions.setImage(location));

      // 미리보기 이미지
      setPreviewImage(file);
      setImageUploadLoading(false);
    } catch (error) {
      setImageUploadLoading(false);
      errorAlert(
        '이미지 업로드 실패',
        '이미지 업로드에 실패하였습니다. 다시 시도해주세요.😰'
      );
      console.error(error);
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
      dispatch(CreateNoticeActions.setImage(''));
      // 미리보기 이미지
      setPreviewImageFile(null);
      setImageUploadLoading(false);
    } catch (error) {
      setImageUploadLoading(false);
      errorAlert(
        '이미지 삭제 실패',
        '이미지 삭제에 실패하였습니다. 다시 시도해주세요.😰'
      );
      console.error(error);
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
      dispatch(CreateNoticeActions.setImage(location));

      // 미리보기 이미지
      setPreviewImage(file);
      setImageUploadLoading(false);
    } catch (error) {
      setImageUploadLoading(false);
      errorAlert(
        '이미지 변경 실패',
        '이미지 변경에 실패하였습니다. 다시 시도해주세요.😰'
      );
      console.error(error);
    }
  };

  const onChangeInputState = (
    e: React.ChangeEvent<FormElement>,
    actionName: CreacteNoticeActionType
  ) => {
    dispatch(CreateNoticeActions[actionName](e.currentTarget.value));
  };

  const onChangeSelectState = (region: AddressType) => {
    dispatch(CreateNoticeActions.setAddress(region));
  };

  const onChangeDatePickderState = (date: string) => {
    dispatch(CreateNoticeActions.setMeetingTime(date));
  };

  const onSubmit = async () => {
    try {
      const boardId = await noticeService.createNotice(token, {
        title,
        content,
        address,
        meetingTime,
        openChat,
        image,
        author,
      });
      await successAlert(
        '게시글이 저장',
        '게시글이 저장되었습니다.',
        undefined,
        false,
        1500
      );
      history.push(`/boards/run/${boardId}`);
    } catch (error) {
      await errorAlert(
        '게시물 생성 실패',
        '게시물 생성에 실패하였습니다. 죄송합니다.😰'
      );
      history.push('/');
    }
  };

  const checkData = () => {
    [
      [openChat, '오픈 채팅 주소를 입력해주세요'],
      [content, '게시물 내용을 작성해주세요'],
      [address.si, '모든 주소를 선택해주세요'],
      [title, '제목을 작성해주세요'],
      [imageUploadLoading, '이미지가 저장 중입니다. 조금만 기다려주세요 :)'],
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
    dispatch(CreateNoticeActions.setInit());
  }, []);

  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <form
          className="w-2/3 "
          onSubmit={(e) => {
            e.preventDefault();
            if (checkData()) {
              onSubmit();
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
                              CreateNoticeActions.setMeetingTime(
                                enoughDeadLine.toString()
                              )
                            );
                            setTimeOnOff(false);
                          }
                          if (!timeOnOff) {
                            dispatch(CreateNoticeActions.setMeetingTime(''));
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
                {previewImageFile ? (
                  <img
                    src={previewImageFile as string}
                    alt="map"
                    className="w-full"
                  />
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
              onChange={(e) => dispatch(CreateNoticeActions.setContent(e))}
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

export default withRouter(CreateNotice);
