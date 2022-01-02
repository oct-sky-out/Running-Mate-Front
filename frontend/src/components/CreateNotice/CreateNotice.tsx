import React, { useState, useRef, useEffect, useMemo } from 'react';
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

type CreacteNoticeActionType =
  | 'setTitle'
  | 'setExplain'
  | 'setLocation'
  | 'setOpenChatLink';

const CreateNotice = () => {
  //* useRef
  const imageInputRef = useRef<HTMLInputElement>(null);
  //* Redux
  const dispatch = useDispatch();

  //* Redux State
  const { title, explain, time, location, openChatURL, imageOneURL } =
    useSelector((state) => ({
      title: state.createNotice.title,
      explain: state.createNotice.explain,
      time: state.createNotice.time,
      location: state.createNotice.location,
      openChatURL: state.createNotice.openChatLink,
      imageOneURL: state.createNotice.imageOneURL,
    }));

  //* useState
  const [fileImage, setFileImage] = useState<string | ArrayBuffer | null>();

  //* event version
  const saveFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const reader = new FileReader();
    reader.onload = () => {
      dispatch(CreateNoticeActions.setImageOneURL(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const onChangeInputState = (
    e: React.ChangeEvent<FormElement>,
    actionName: CreacteNoticeActionType
  ) => {
    dispatch(CreateNoticeActions[actionName](e.currentTarget.value));
  };

  const onChangeDatePickderState = (date: Date | null) => {
    dispatch(CreateNoticeActions.setTime(date || new Date()));
  };

  useEffect(() => {
    dispatch(CreateNoticeActions.setInit());
  }, []);

  useEffect(() => {
    dispatch(CreateNoticeActions.setImageOneURL(fileImage));
  }, [fileImage]);

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
              style={{ fontSize: '2rem' }}
            />
          </div>
          <div className="flex justify-between mb-5">
            <div className="w-full flex flex-col justify-center space-y-5">
              <div>
                <div className="flex w-full items-center">
                  <span className="whitespace-nowrap mr-5 font-bold">
                    러닝 만남 시간 :
                  </span>
                  <DatePicker
                    selected={time}
                    onChange={onChangeDatePickderState}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                  />
                </div>
              </div>
              <div>
                <span className="mr-5 font-bold mb-4">러닝 만남 장소 :</span>
                <Input
                  underlined
                  bordered
                  type="text"
                  width="50%"
                  placeholder="만남 장소"
                  color="secondary"
                  onChange={(e) => {
                    onChangeInputState(e, 'setLocation');
                  }}
                  value={location}
                  data-testid="location-input"
                  style={{ fontSize: '1rem' }}
                />
              </div>
              <div>
                <span className="mr-5 w-full font-bold">오픈 채팅 링크 :</span>
                <Input
                  underlined
                  bordered
                  type="text"
                  width="50%"
                  placeholder="오픈 채팅 링크"
                  color="secondary"
                  onChange={(e) => {
                    onChangeInputState(e, 'setOpenChatLink');
                  }}
                  value={openChatURL}
                  style={{ fontSize: '1rem' }}
                  data-testid="openChatLink-input"
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-col justify-center items-center rounded border-solid border-2 border-indigo-400 h-60 w-60 mb-3">
                {imageOneURL ? (
                  <img
                    src={imageOneURL as string}
                    alt="map"
                    className="h-full w-full"
                  />
                ) : (
                  <div className="h-ful w-full flex flex-col justify-center items-center text-indigo-400">
                    <span className="block">러닝 경로 지도를</span>
                    <span className="block">등록해주세요</span>
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
                  onChange={saveFileImage}
                />
              </label>
            </div>
          </div>
          <div className="mb-16">
            <ReactQuill
              theme="snow"
              value={explain}
              onChange={(e) => dispatch(CreateNoticeActions.setExplain(e))}
              style={{ height: '300px' }}
              data-testid="explain-input"
              placeholder="공지 설명글을 작성해주세요 :)"
            />
          </div>
          <div className="flex justify-end">
            <div className="w-3/12 flex flex-col">
              <Button auto color="#8b8bf5" rounded data-testid="submit-button">
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
