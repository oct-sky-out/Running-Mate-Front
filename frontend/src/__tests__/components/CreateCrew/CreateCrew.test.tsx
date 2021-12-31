//* 테스팅 모듈
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Router, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CreateCrew from '../../../components/Crew/CreateCrew/CreateCrew';
import { useMockStore } from '../../../modules';
import { createMemoryHistory } from 'history';

const store = useMockStore;

describe('CreateCrew 컴포넌트 테스팅', () => {
  it('이전, 다음 버튼을 누르면 내용이 잘 바뀌는가?', async () => {
    const CreateCrew_ = withRouter(CreateCrew);
    const history = createMemoryHistory({ initialEntries: ['/crew/new'] });
    render(
      <Provider store={store}>
        <Router history={history}>
          <CreateCrew_ />
        </Router>
      </Provider>
    );
    const questionSpan = (await screen.findByTestId(
      'question-span'
    )) as HTMLInputElement;
    const previousButton = (await screen.findByTestId(
      'previous-button'
    )) as HTMLButtonElement;
    const nextButton = (await screen.findByTestId(
      'next-button'
    )) as HTMLButtonElement;

    expect(questionSpan.innerHTML).toEqual('크루이름이 무엇인가요?');
    userEvent.click(nextButton);
    expect(questionSpan.innerHTML).toEqual('달리는 지역이 어딘가요?');
    userEvent.click(nextButton);
    expect(questionSpan.innerHTML).toEqual(
      '간단한 크루 소개글을 작성해주세요.'
    );
    userEvent.click(previousButton);
    expect(questionSpan.innerHTML).toEqual('달리는 지역이 어딘가요?');
    userEvent.click(previousButton);
    expect(questionSpan.innerHTML).toEqual('크루이름이 무엇인가요?');
  });
  it('Redux store의 crewName, crewRegion, crewExplain state가 잘 바뀌는가?', async () => {
    const CreateCrew_ = withRouter(CreateCrew);
    const history = createMemoryHistory({ initialEntries: ['/crew/new'] });
    render(
      <Provider store={store}>
        <Router history={history}>
          <CreateCrew_ />
        </Router>
      </Provider>
    );

    const nextButton = (await screen.findByTestId(
      'next-button'
    )) as HTMLButtonElement;
    const dataInput = (await screen.findByTestId(
      'data-input'
    )) as HTMLInputElement;

    userEvent.type(dataInput, '달려라하니');
    userEvent.click(nextButton);
    userEvent.type(dataInput, '서울');
    userEvent.click(nextButton);
    userEvent.type(dataInput, '긍정적인 마인드가 가득한 크루입니다.');
    userEvent.click(nextButton);
    expect(store.getState().createCrew.crew.crewName).toEqual('달려라하니');
    expect(store.getState().createCrew.crew.crewRegion).toEqual('서울');
    expect(store.getState().createCrew.crew.crewExplain).toEqual(
      '긍정적인 마인드가 가득한 크루입니다.'
    );
  });
  it('Redux store의 crewName, crewRegion, crewExplain state가 다 입력되면 완료 버튼이 활성화되는가?', async () => {
    const CreateCrew_ = withRouter(CreateCrew);
    const history = createMemoryHistory({ initialEntries: ['/crew/new'] });
    render(
      <Provider store={store}>
        <Router history={history}>
          <CreateCrew_ />
        </Router>
      </Provider>
    );

    const nextButton = (await screen.findByTestId(
      'next-button'
    )) as HTMLButtonElement;
    const previousButton = (await screen.findByTestId(
      'previous-button'
    )) as HTMLButtonElement;
    const dataInput = (await screen.findByTestId(
      'data-input'
    )) as HTMLInputElement;

    userEvent.click(nextButton);
    userEvent.click(nextButton);
    expect(nextButton.disabled).toBe(true);

    userEvent.click(previousButton);
    userEvent.click(previousButton);
    userEvent.type(dataInput, '달려라하니');
    userEvent.click(nextButton);
    userEvent.type(dataInput, '서울');
    userEvent.click(nextButton);
    userEvent.type(dataInput, '긍정적인 마인드가 가득한 크루입니다.');
    expect(nextButton.disabled).toBe(false);
    userEvent.click(nextButton);
    expect(store.getState().createCrew.crew.crewName).not.toEqual('');
    expect(store.getState().createCrew.crew.crewRegion).not.toEqual('');
    expect(store.getState().createCrew.crew.crewExplain).not.toEqual('');
  });
});
