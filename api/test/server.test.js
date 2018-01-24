let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);


	describe('/POST login', () => {
	  it('it should not login with empty strings', (done) => {
	  		let credentials = {username:'',password:''}
			
			chai.request(server)
		    .post('/login')
		    .send(credentials)
		    .end((err, res) => {
			  	res.should.have.status(401);
			  	res.body.should.be.a('object');
			  	res.body.status.should.eql('invalid credentials');
		      done();
		    });
	  });
  	})

	describe('/POST login', () => {
	  it('it should login with any user/pass', (done) => {
	  		let credentials = {username:'a',password:'a'}
			
			chai.request(server)
		    .post('/login')
		    .send(credentials)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
		        res.body.status.should.eql('success');
		      done();
		    });
	  });
  	})

  	describe('/GET policies', () => {
	  it('it should get the policies list when authenticated', (done) => {
	  		let credentials = {username:'a',password:'a'}
		    chai.request(server)
		    .post('/login')
		    .send(credentials)
		    .end((err, res) => {
		      should.not.exist(err);
		      chai.request(server)
		      .get('/policies')
		      .set('authorization', 'Bearer ' + res.body.token)
		      .end((err, res) => {
		        should.not.exist(err);
		        res.status.should.eql(200);
		        res.type.should.eql('application/json');
		        res.body.should.be.a('object');
		        res.body.should.have.property('policies');
		        res.body.policies.should.be.a('array');
		        done();
		      });
	    });
	    });
  	})

  	describe('/GET policies', () => {
	  it('it should not get the policies list without authentication', (done) => {
		    chai.request(server)
	      	.get('/policies')
		    .end((err, res) => {
		        res.status.should.eql(401);
		        done();
		      });
	    });
  	})

  	describe('/GET logout', () => {
	  it('it should logout an authenticated user', (done) => {
	  		let credentials = {username:'a',password:'a'}
		    chai.request(server)
		    .post('/login')
		    .send(credentials)
		    .end((err, res) => {
		      should.not.exist(err);
		      chai.request(server)
		      .get('/logout')
		      .set('authorization', 'Bearer ' + res.body.token)
		      .end((err, res) => {
		        should.not.exist(err);
		        res.status.should.eql(200);
		        res.type.should.eql('application/json');
			  	res.body.should.be.a('object');
		        res.body.status.should.eql('user logged out');
		        done();
		      });
	    });
	    });
  	})
