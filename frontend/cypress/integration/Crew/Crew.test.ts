export {};

describe('Crew Page Test', () => {
  it('크루 페이지 이동 - 크루 가입하기 버튼 클릭 - 크루 상세정보 이동', () => {
    //* 메인페이지
    cy.visit('http://localhost:3000');

    //* 크루 페이지 이동
    cy.get('[href="/crew"]').click();
    cy.url().should('eq', 'http://localhost:3000/crew');

    //* 크루 가입하기 버튼 클릭
    cy.get('[data-cy="join-crew"]').should('be.enabled').click();
    cy.window().its('scrollY').should('not.equal', 0);

    //* 크루 상세페이지 이동
    cy.get('[data-cy="0-crew-link"]').click();

    cy.url().should(
      'eq',
      'http://localhost:3000/crew/5d9824da-a9bb-4c40-8cf8-5888f6b5d771'
    );
  });

  it('크루 페이지 이동 - 크루 생성하기 버튼 클릭 - /crew/new 이동', () => {
    //* 메인페이지
    cy.visit('http://localhost:3000');

    //* 크루 페이지 이동
    cy.get('[href="/crew"]').click();
    cy.url().should('eq', 'http://localhost:3000/crew');

    //* 크루 생성하기 버튼 클릭
    cy.get('[data-cy="create-new-crew"]').click();
    cy.url().should('eq', 'http://localhost:3000/crew/new');
  });
});
