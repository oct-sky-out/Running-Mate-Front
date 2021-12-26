export {};

describe('ViewNotice Page Test', () => {
  it('공지 페이지 이동 후 뒤로가기', () => {
    //* 메인페이지
    cy.visit('http://localhost:3000');

    //* 공지 페이지 이동
    cy.get('[href="/notice/0"]').click();
    cy.url().should('eq', 'http://localhost:3000/notice/0');

    //* 메인 페이지 이동
    cy.get('[data-cy="back"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
