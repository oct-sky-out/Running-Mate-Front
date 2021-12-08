/**
 * @jest-environment jsdom
 */

//* 테스팅 모듈
import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { useMockStore } from '../../../modules';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';

//* 페이지 모듈
import React, { useEffect, useRef, useState } from 'react';
import { Link, Router, withRouter } from 'react-router-dom';
import { useSelector } from '../../../modules';
import { v4 } from 'uuid';
import { Button } from '@nextui-org/react';
import imageURL from '../../../lib/URL/Image';
import CrewMock from '../../../excuteData/CrewMock/CrewMock';

import CrewDetail from '../../../components/Crew/CrewDetail';

const Crew = () => {
  //* Redux
  //! 로그인 상태로 가정했습니다.
  const { _crew, _crewId, nickname } = useSelector((state) => ({
    _crew: state.signIn.userData.crew,
    _crewId: state.signIn.userData.crewId,
    nickname: state.signIn.userData.nickname,
  }));

  //* useState
  const [imageOrder, setImageOrder] = useState(0);
  //imageURL[imageOrder]

  const crewBoardTop = useRef<undefined | number>(undefined);

  //* useEffect
  useEffect(() => {
    setInterval(
      () => setImageOrder(imageOrder === 2 ? 0 : imageOrder + 1),
      1000
    );
  }, [imageOrder]);

  const scrollDown = () => {
    window.scrollTo({ top: crewBoardTop.current, behavior: 'smooth' });
  };

  //* 임시 테스트 데이터
  const crew = '궈궈러닝';

  return (
    <div className="h-screen" style={{ height: '100vh' }}>
      <div
        className="bg-fixed"
        style={{ background: `url(${imageURL[imageOrder]})` }}
      >
        <div
          className="bg-white bg-opacity-50 relative h-1/3"
          style={{ height: '300px' }}
        >
          {crew && (
            <div className="">
              <h1>
                {nickname}님의 크루는 {crew}입니다!
              </h1>
              <Link
                to={`/crew/ee36a825-c061-4f1f-8ca4-438f1048afbb`}
                data-testid="move-crew-detail"
              >
                크루로 가기 ▹
              </Link>
              {/* to={`/crew/${crewId}`} */}
            </div>
          )}
          {crew || (
            <div className="">
              <h1>크루에 들어가서 같이 뛰실래요?</h1>
              <Button onClick={scrollDown} data-testid="joinCrew">
                크루 가입하기 ▹
              </Button>
            </div>
          )}
        </div>
        <div
          ref={(ref) => (crewBoardTop.current = ref?.offsetTop)}
          className="h-2/3"
          style={{ height: '600px' }}
        >
          {CrewMock.crew.map((crewInformation, index) => (
            <Link
              to={`/crew/${crewInformation.crewID}`}
              key={v4()}
              data-testid={`${index}-crew-link`}
            >
              <img
                src={crewInformation.imageUrl}
                alt={`${crewInformation.crewName}_image`}
              />
              <span>{crewInformation.crewName}</span>
              <span>{crewInformation.crewLeader}</span>
              <span>{crewInformation.crewArea}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Crew);

const store = useMockStore;
describe('크루 페이지', () => {
  it('크루 페이지 (로그인 가정.) 렌더링 후 크루 가입하기 버튼이 나오지않는가?', async () => {
    // TODO 렌더링 - 로그인 상태가정 - 크루 만들기 버튼없음

    const Crew_ = withRouter(Crew);
    const history = createMemoryHistory({ initialEntries: ['/crew'] });
    const { getByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Crew_ />
        </Router>
      </Provider>
    );

    expect(history.location.pathname).toBe('/crew');
    expect(getByTestId('move-crew-detail')).toBeInTheDocument();
    //! 화면에 렌더링이 되지않으므로 jest가 렌더링되지않은 버튼을 발견 못하여 오류 발생
    expect(() => getByTestId('joinCrew')).toThrow();
  });

  it('크루 페이지 (로그인 가정.) 렌더링 후 내 크루로가기 링크를 누르면 URL이 변경되는가?', async () => {
    // TODO 렌더링 - 로그인 상태가정 - 내 크루 이동 - URL체크
    const Crew_ = withRouter(Crew);
    const history = createMemoryHistory({ initialEntries: ['/crew'] });
    const { getByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Crew_ />
        </Router>
      </Provider>
    );

    const goMyCrewLink = getByTestId('move-crew-detail');
    expect(goMyCrewLink).toBeInTheDocument();

    userEvent.click(goMyCrewLink);
    expect(history.location.pathname).toBe(
      '/crew/ee36a825-c061-4f1f-8ca4-438f1048afbb'
    );
  });

  it('크루 페이지에서 크루들의 목록들 중 하나를 클릭했을 때 URL이 이동하는가?', async () => {
    // TODO 렌더링 - 크루 리스트 중 하나 클릭 - URL체크

    const Crew_ = withRouter(Crew);
    const history = createMemoryHistory({ initialEntries: ['/crew'] });
    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Crew_ />
        </Router>
      </Provider>
    );

    expect(history.location.pathname).toBe('/crew');

    const crewLink1 = (await screen.getByTestId(
      '0-crew-link'
    )) as HTMLDivElement;
    userEvent.click(crewLink1);

    expect(history.location.pathname).toBe(
      '/crew/5d9824da-a9bb-4c40-8cf8-5888f6b5d771'
    );
  });
});
