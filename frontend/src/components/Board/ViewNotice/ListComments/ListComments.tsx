import { useHistory } from 'react-router-dom';
import { v4 } from 'uuid';
import { Avatar } from '@nextui-org/react';
import CommentData from '../../../../excuteData/CommentMock/CommentData';
import * as url from '../../../../assets/default_profile.png';

const ListComments = () => {
  const history = useHistory();

  return (
    <ul>
      {Object.keys(CommentData).map((key) => {
        const comment = CommentData[key];
        return (
          <li
            className="h- border-purple border-b my-3 space-y-4 p-3"
            key={v4()}
          >
            <div
              className="flex items-center"
              onClick={() => history.push(`/user/${comment.author}`)}
            >
              <div className="mr-2 float-left">
                <Avatar src={url.default} />
              </div>
              <div>
                <span className="w-32 font-bold mr-4 block">
                  {comment.author}
                </span>
                <span className="text-gray-400 block pointer-events-none">
                  {comment.time}
                </span>
              </div>
            </div>

            <p className="text-lg pb-4">{comment.content}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ListComments;
