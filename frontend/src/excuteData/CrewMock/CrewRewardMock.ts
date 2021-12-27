import { IconType } from 'react-icons';
import { BiRun } from 'react-icons/bi';
import { AiFillTrophy } from 'react-icons/ai';
import { GiLaurelsTrophy } from 'react-icons/gi';

type CrewRewardMockType = {
  title: string;
  description: string;
  icon?: IconType;
  iconColor?: string;
  image?: React.FC<any>;
};

const crewRewardMock: CrewRewardMockType[] = [
  {
    icon: BiRun,
    title: '달리기 횟수',
    description: '12',
  },
  {
    icon: AiFillTrophy,
    title: '12월 전체 랭킹',
    description: '89위',
  },

  {
    icon: GiLaurelsTrophy,
    title: '12월 전체 TOP100',
    description: '',
  },
  {
    icon: AiFillTrophy,
    title: '12월 전체 랭킹',
    description: '89위',
  },

  {
    icon: GiLaurelsTrophy,
    title: '12월 전체 TOP100',
    description: '',
  },
  {
    icon: AiFillTrophy,
    title: '12월 전체 랭킹',
    description: '89위',
  },

  {
    icon: GiLaurelsTrophy,
    title: '12월 전체 TOP100',
    description: '',
  },
  {
    icon: AiFillTrophy,
    title: '12월 전체 랭킹',
    description: '89위',
  },

  {
    icon: GiLaurelsTrophy,
    title: '12월 전체 TOP100',
    description: '',
  },
];

export default crewRewardMock;
