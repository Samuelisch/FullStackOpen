describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const testUsers = [
      {
        username: 'testuser',
        name: 'testuser',
        password: 'test'
      },
      {
        username: 'seconduser',
        name: 'seconduser',
        password: 'test'
      }
    ]
    for (let user of testUsers) {
      cy.request('POST', 'http://localhost:3003/api/users/', user)
    }
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blog App')
    cy.contains('Blogs')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#username').type('testuser')
    cy.get('#password').type('test')
    cy.get('#login-button').click()

    cy.contains('Logged in as testuser')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('testuser')
    cy.get('#password').type('wrongpass')
    cy.get('#login-button').click()

    cy.get('.notification')
      .should('contain', 'Wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'test' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.testurl.com')
      cy.contains('Add blog').click()
      cy.contains('test title')
    })

    it('user can logout', function() {
      cy.contains('logout').click()
      cy.contains('logged out')
    })

    it('and login again as another user', function() {
      cy.contains('logout').click()
      cy.login({ username: 'seconduser', password: 'test' })
      cy.contains('Logged in as seconduser')
    })

    describe('after blog post exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'test blog',
          author: 'test author',
          url: 'www.testurl.com'
        })
      })

      it('blog view button reveals more details', function() {
        cy.contains('test blog').parent().find('.viewButton').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'hide')
      })

      it('when viewing details like button can be clicked', function() {
        cy.contains('test blog').parent().find('.viewButton').click()
        cy.get('.likeButton').click()
        cy.contains('Likes: 1')
        cy.contains('remove')
      })

      it('user can delete a blog', function() {
        cy.contains('test blog').parent().find('.viewButton').click()
        cy.get('.deleteButton').click()
        cy.get('html').should('not.contain', 'test blog')
      })

      it.only('when logged in as another user, cannot delete post by others', function() {
        cy.contains('logout').click()
        cy.login({ username: 'seconduser', password: 'test' })
        cy.contains('test blog').parent().find('.viewButton').click()
        cy.contains('test blog').parent().parent().should('not.contain', 'remove')
      })
    })
  })
})