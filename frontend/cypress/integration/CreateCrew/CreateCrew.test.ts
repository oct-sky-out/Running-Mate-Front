export {};

describe('CreateCrew Page Test', () => {
  it('크루 생성 페이지 이동 - 생성 크루 정보 입력 - 크루 페이지 이동', () => {
    //* 크루 생성 페이지 이동
    cy.visit('http://localhost:3000/crew/new');

    //* 생성할 크루 이름 입력
    cy.get('[data-testid="data-input"]').type('달려라하니');
    cy.get('[data-testid="next-button"]').click();

    //* 생성할 크루 지역 입력
    cy.get('[data-testid="data-input"]').type('서울');
    cy.get('[data-testid=next-button]').click();

    //* 완료버튼 비활성화 확인
    cy.get('[data-testid="next-button"]').should('be.disabled');

    //* 생성할 크루 소개 입력
    cy.get('[data-testid="data-input"]').type(
      '긍정적인 사람들이 모인 크루입니다.'
    );
    cy.get('[data-testid=next-button]').click();

    //* 크루 페이지로 이동
    cy.get('[data-testid="go-crew-page-button"]').click();
    cy.url().should('eq', 'http://localhost:3000/crew');
  });
});
