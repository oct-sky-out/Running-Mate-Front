import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button } from '@nextui-org/react';
import { FormElement } from '@nextui-org/react/esm/input/input-props';
// Quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// DatePicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { CreateNoticeActions } from '../../modules/createNotice';
import { useSelector } from '../../modules';

import SelecRegion from '../SelectRegion/SelcetRegion';
import { AddressType } from '../../modules/types/createNotice';
// API
import NoticeService from '../../lib/api/notiveService';

type CreacteNoticeActionType = 'setTitle' | 'setExplain' | 'setOpenChat';

const CreateNotice = () => {
  //* API
  const noticeService = new NoticeService();

  //* useState
  const [seletedDate, setSelectedDate] = useState(new Date());
  //* useRef
  const imageInputRef = useRef<HTMLInputElement>(null);
  //* Redux
  const dispatch = useDispatch();

  //* Redux State
  const { title, content, address, time, openChat, image, token } = useSelector(
    (state) => ({
      title: state.createNotice.title,
      content: state.createNotice.content,
      address: state.createNotice.address,
      time: state.createNotice.content,
      openChat: state.createNotice.openChat,
      image: state.createNotice.image,
      token: state.signIn.token,
    })
  );

  //* event version
  // const saveFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) return;
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     dispatch(CreateNoticeActions.setImage(reader.result || ''));
  //   };
  //   reader.readAsDataURL(file);
  // };

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
    dispatch(CreateNoticeActions.setTime(date));
  };

  const onSubmit = () => {
    noticeService
      .createNotice(token, {
        title,
        content,
        address,
        time,
        openChat,
        image,
      })
      .then((id) => {
        console.log(id);
      });
  };
  useEffect(() => {
    dispatch(CreateNoticeActions.setInit());
  }, []);

  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <form className="w-2/3 ">
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
                    러닝 만남 시간
                  </span>
                  <div className="w-full py-1 pl-4 rounded border-solid border-2 border-indigo-400">
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
                {image ? (
                  <img src={image as string} alt="map" className="w-full" />
                ) : (
                  <div className="h-ful w-full flex flex-col justify-center items-center text-indigo-400 space-y-2">
                    <span className="block">러닝 경로 지도를</span>
                    <span className="block">등록해주세요</span>
                    <span className="block">(네이버지도 or 카카오 지도)</span>
                  </div>
                )}
              </div>
              <label
                htmlFor="notice-image"
                className="w-64 flex flex-col items-center px-4 py-3 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple ease-linear transition-all duration-150"
              >
                러닝 경로 지도 등록
                <input
                  ref={imageInputRef}
                  id="notice-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  // onChange={saveFileImage}
                />
              </label>
            </div>
          </div>
          <div className="mb-20 md:mb-16">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={(e) => dispatch(CreateNoticeActions.setExplain(e))}
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
                rounded
                data-testid="submit-button"
                onClick={onSubmit}
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

export default CreateNotice;
