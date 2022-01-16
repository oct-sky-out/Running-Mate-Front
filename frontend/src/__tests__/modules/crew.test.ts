import reducer, { crewActions } from '../../modules/crew';
import { ICrewType, ICrews } from '../../modules/types/crewTypes';

const initState: ICrewType & ICrews = {
  id: 0,
  crewLeaderId: 0,
  crewRegion: '',
  openChat: '',
  crewName: '',
  explanation: '',
  crews: [],
};

describe('크루 리덕스 테스트', () => {
  test('크루 상세정보 조회API 호출 시 크루 리덕스의 상태가 바뀌는가?', () => {
    expect(
      reducer(
        initState,
        crewActions.getCrewDetail({
          id: 1,
          crewLeaderId: 12,
          crewName: 'the CREW',
          crewRegion: '서울특별시 강남구',
          explanation: '서울에 뛰는 크루',
          openChat: 'http://openchat.com',
        })
      )
    ).toEqual({
      id: 1,
      crewLeaderId: 12,
      crewName: 'the CREW',
      crewRegion: '서울특별시 강남구',
      explanation: '서울에 뛰는 크루',
      openChat: 'http://openchat.com',
      crews: [],
    });
  });
  test('크루 전체 조회API 호출 시 크루 리덕스의 상태가 바뀌는가?', () => {
    expect(
      reducer(
        initState,
        crewActions.getCrews({
          crews: [
            {
              id: 1,
              crewLeaderId: 12,
              crewName: 'the CREW',
              crewRegion: '서울특별시 강남구',
              explanation: '서울에 뛰는 크루',
              openChat: 'http://openchat.com',
            },
            {
              id: 1,
              crewLeaderId: 12,
              crewName: 'the CREW',
              crewRegion: '서울특별시 강남구',
              explanation: '서울에 뛰는 크루',
              openChat: 'http://openchat.com',
            },
            {
              id: 1,
              crewLeaderId: 12,
              crewName: 'the CREW',
              crewRegion: '서울특별시 강남구',
              explanation: '서울에 뛰는 크루',
              openChat: 'http://openchat.com',
            },
            {
              id: 1,
              crewLeaderId: 12,
              crewName: 'the CREW',
              crewRegion: '서울특별시 강남구',
              explanation: '서울에 뛰는 크루',
              openChat: 'http://openchat.com',
            },
          ],
        })
      )
    ).toEqual({
      id: 0,
      crewLeaderId: 0,
      crewRegion: '',
      openChat: '',
      crewName: '',
      explanation: '',
      crews: [
        {
          id: 1,
          crewLeaderId: 12,
          crewName: 'the CREW',
          crewRegion: '서울특별시 강남구',
          explanation: '서울에 뛰는 크루',
          openChat: 'http://openchat.com',
        },
        {
          id: 1,
          crewLeaderId: 12,
          crewName: 'the CREW',
          crewRegion: '서울특별시 강남구',
          explanation: '서울에 뛰는 크루',
          openChat: 'http://openchat.com',
        },
        {
          id: 1,
          crewLeaderId: 12,
          crewName: 'the CREW',
          crewRegion: '서울특별시 강남구',
          explanation: '서울에 뛰는 크루',
          openChat: 'http://openchat.com',
        },
        {
          id: 1,
          crewLeaderId: 12,
          crewName: 'the CREW',
          crewRegion: '서울특별시 강남구',
          explanation: '서울에 뛰는 크루',
          openChat: 'http://openchat.com',
        },
      ],
    });
  });
  test('크루 정보변경을 위해 사용자가 인풋박스에 입력시 크루 이름 리덕스의 상태가 바뀌는가?', () => {
    expect(
      reducer(initState, crewActions.setCrewName('크루이름 견본'))
    ).toEqual({
      id: 0,
      crewLeaderId: 0,
      crewRegion: '',
      openChat: '',
      explanation: '',
      crewName: '크루이름 견본',
      crews: [],
    });
  });
});
