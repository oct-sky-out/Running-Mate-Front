import { IconType } from 'react-icons';
import { BiRun } from 'react-icons/bi';
import { AiFillTrophy } from 'react-icons/ai';
import { GiLaurelsTrophy } from 'react-icons/gi';

type UserHistoryMockType = {
  title: string;
  description: string;
  icon?: IconType;
  iconColor?: string;
  image?: React.FC<any>;
};

const UserPageMock: UserHistoryMockType[] = [
  {
    icon: BiRun,
    title: '달리기 횟수',
    description: '12',
  },
  {
    icon: AiFillTrophy,
    title: '크루 달리기 참여 횟수',
    description: '24',
  },
  {
    icon: GiLaurelsTrophy,
    title: '지금까지 뛴 거리',
    description: '100km',
  },
];

export default UserPageMock;
