describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    cy.create_user({ username: 'testkayt', password: 'testsalis'})
  })

  it('Login form is shown', function() {
    cy.contains('login to app')
  })
})

describe('Login', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    cy.create_user({ username: 'testkayt', password: 'testsalis'})
  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type('testkayt')
    cy.get('#password').type('vaarasalis')
    cy.get('#login-button').click()

    cy.contains('login to app')
  })
  
  it('succeeds with correct credentials', function() {
    cy.get('#username').clear().type('testkayt')
    cy.get('#password').clear().type('testsalis')
    cy.get('#login-button').click()

    cy.contains('logged in')
  })
  
  describe.only('When logged in', function() {
    
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/test/reset')
      cy.create_user({ username: 'testkayt', password: 'testsalis'})
      cy.login({ username: 'testkayt', password: 'testsalis'})
    })
    
    it('A blog can be created', function() {
      cy.contains('create new blog').click()

      cy.get('#title').clear().type('testtitle')
      cy.get('#author').clear().type('testauthor')
      cy.get('#url').clear().type('testurl')
      cy.get('#createBlog-button').click()

      cy.contains('testtitle testauthor')
    })

    it('Created blog can be deleted', function() {
      cy.create_blog({ title: 'testtitle', author: 'testauthor', url:'testurl'})

      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes:1')

      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('likes:3')
    })
    
    it('A blog can be removed', function() {
      cy.create_blog({ title: 'testtitle', author: 'testauthor', url:'testurl'})

      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'testtitle')
      cy.get('html').should('not.contain', 'testauthor')
      cy.get('html').should('not.contain', 'testurl')
    })

    it.only('Diffirently named blogs are listed from most to least liked', function() {
      cy.create_blog({ title: 'testtitle', author: 'testauthor', url:'testurl'})
      cy.create_blog({ title: 'test2title', author: 'test2author', url:'test2url'})
      
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes:1')

      cy.contains('test2title').contains('view').click()
      cy.contains('test2title').contains('like').click()
      cy.contains('test2title').contains('like').click()

      let prevLikes = 1000
      cy.get('.blog').then(($blog) => {
        let likes = $blog.text().substring(42,43)
        console.log(cy.get($blog).find('#likes'))
        console.log($blog.text().substring(42, 43))
        expect($blog)
      })
      
      
    })

  })

  
})