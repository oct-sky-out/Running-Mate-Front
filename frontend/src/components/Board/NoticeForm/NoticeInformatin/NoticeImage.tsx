import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isNull } from 'lodash';
import { Loading } from '@nextui-org/react';
import ImageButtons from '../../../../common/components/ImageButtons';
import useImageDelete from '../../../../common/hooks/useImageDelete';
import useImageUploader from '../../../../common/hooks/useImageUploader';
import useSwalerts from '../../../../common/hooks/useSwalerts';
import { useSelector } from '../../../../modules';
import { CreateNoticeActions } from '../../../../modules/createNotice';
import { noticeActions } from '../../../../modules/notice';

interface IProps {
  formType: 'edit' | 'new';
}

const NoticeImage: React.FC<IProps> = ({ formType }) => {
  const dispatch = useDispatch();
  const { newImage, editImage } = useSelector((state) => ({
    newImage: state.createNotice.image,
    editImage: state.viewNotice.viewNoticeData.image,
  }));

  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [previewImageFile, setPreviewImageFile] = useState<
    string | ArrayBuffer | null
  >();

  const imageDelete = useImageDelete();
  const imageUploader = useImageUploader();
  const { errorAlert } = useSwalerts();

  const getImage = () => (formType === 'new' ? newImage : editImage);

  const imageGuide = useMemo(
    () => (
      <div className="h-ful w-full flex flex-col justify-center items-center text-indigo-400 space-y-2">
        <span className="block">러닝 경로 지도를</span>
        <span className="block">등록해주세요(필수X)</span>
        <span className="block">(네이버지도 or 카카오 지도)</span>
      </div>
    ),
    []
  );

  const viewImage = useCallback(() => {
    if (formType === 'new') {
      return previewImageFile ? (
        <img src={previewImageFile as string} alt="map" className="w-full" />
      ) : (
        imageGuide
      );
    }
    if (formType === 'edit')
      return editImage ? (
        <img src={editImage as string} alt="map" className="w-full" />
      ) : (
        imageGuide
      );
    return null;
  }, [previewImageFile]);

  const deleteImageFile = () => {
    try {
      setImageUploadLoading(true);
      const image = getImage();
      const imageURLArr = image.split('/');
      const fileName = `${imageURLArr[imageURLArr.length - 2]}/${
        imageURLArr[imageURLArr.length - 1]
      }`;

      imageDelete(fileName);
      if (formType === 'new') dispatch(CreateNoticeActions.setImage(''));
      if (formType === 'edit') dispatch(noticeActions.setImage(''));
      setPreviewImageFile(null);
    } catch {
      errorAlert(
        '이미지 삭제 실패',
        '이미지 삭제에 실패하였습니다. 다시 시도해주세요.😰'
      );
    } finally {
      setImageUploadLoading(false);
    }
  };

  const setPreviewImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImageFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const editImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setImageUploadLoading(true);
      if (!e.target.files) return;
      // 삭제
      const image = getImage();
      if (image) {
        const imageURLArr = image.split('/');
        const fileName = `${imageURLArr[imageURLArr.length - 2]}/${
          imageURLArr[imageURLArr.length - 1]
        }`;
        imageDelete(fileName);
      }
      // 업로드
      const file = e.target.files[0];
      const location = await imageUploader(file, 'boardImage');
      if (formType === 'new') dispatch(CreateNoticeActions.setImage(location));
      if (formType === 'edit') dispatch(noticeActions.setImage(location));

      // 미리보기 이미지
      setPreviewImage(file);
    } catch (error) {
      errorAlert(
        '이미지 변경 실패',
        '이미지 변경에 실패하였습니다. 다시 시도해주세요.😰'
      );
    } finally {
      setImageUploadLoading(false);
    }
  };

  const saveImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setImageUploadLoading(true);
      if (!e.target.files) return;
      const file = e.target.files[0];
      const location = await imageUploader(file, 'boardImage');
      if (formType === 'new') dispatch(CreateNoticeActions.setImage(location));
      if (formType === 'edit') dispatch(noticeActions.setImage(location));
      // 미리보기 이미지
      setPreviewImage(file);
    } catch (error) {
      errorAlert(
        '이미지 업로드 실패',
        '이미지 업로드에 실패하였습니다. 다시 시도해주세요.😰'
      );
    } finally {
      setImageUploadLoading(false);
    }
  };

  console.log(editImage);
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col justify-center items-center rounded border-solid border-2 border-indigo-400 h-60 w-60 mb-3 relative">
        {imageUploadLoading && (
          <div className="w-full h-full absolute top-0 left-0 bg-black opacity-90 flex justify-center items-center">
            <Loading size="medium" color="#8b8bf5" type="points" />
          </div>
        )}
        {viewImage() || '등록된 사진이 없습니다.'}
      </div>
      <ImageButtons
        containerClassName="flex w-64"
        condition={getImage()}
        deleteButtonEvent={deleteImageFile}
        deleteButtonName="사진 삭제"
        editButtonEvent={editImageFile}
        editButtonName="사진 변경"
        uploadButtonEvent={saveImageFile}
        uploadButtonName="러닝 사진 등록"
      />
    </div>
  );
};

export default NoticeImage;
