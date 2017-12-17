var Sequelize = require('sequelize');


module.exports = function(sequelize) {
        console.log("In members.js");	
	var Member = sequelize.define('Member', {
	    name: Sequelize.STRING,
	    email: Sequelize.STRING,
	    pu: Sequelize.STRING,
	    number: Sequelize.STRING,
	    isTeamLead:Sequelize.STRING,
	    empid:Sequelize.STRING,
	    gender:Sequelize.STRING,
	    tshirt:Sequelize.STRING
	    // ... define model fields here
	  }, {
	    classMethods: {
	      associate: function(models) {
	        // define relationships here
	      },
	       isTeamLead: function(email,callback) {
			Member.findOne({
				attribute:['isTeamLead'],
	      		where:{
	      			email:email
	      		}
	      	})
			.then(function(data) {
				if (data) 
				callback(null,data);
				else
					callback({error:"error"});
			})
			.error(function (e) {
				console.log(e);
				return callback(e);
			})
			.catch(function(e) {
				console.log(e);
				return callback(e);
			});
	      },
	      findTeamLead: function(teamid,callback) {
			Member.findOne({
				attribute:['name','email'],
	      		where:{
	      			TeamId:teamid,
	      			isTeamLead:1
	      		}
	      	})
			.then(function(data) {
				if (data) 
				callback(null,data);
				else
					callback({error:"error"});
			})
			.error(function (e) {
				console.log(e);
				return callback(e);
			})
			.catch(function(e) {
				console.log(e);
				return callback(e);
			});
	      },
	      findTeamId: function(email,callback) {
			Member.findOne({
	      		where:{
	      			email:email
	      		}
	      	})
			.then(function(data) {
				if (data) 
				callback(null,data);
				else
					callback({error:"error"});
			})
			.error(function (e) {
				console.log(e);
				return callback(e);
			})
			.catch(function(e) {
				console.log(e);
				return callback(e);
			});
	      },
	      findByTeamId: function(teamid,callback) {
			Member.findAll({
	      		where:{
	      			TeamId:teamid
	      		}
	      	})
			.then(function(data) {
				if (data) 
				callback(null,data);
				else
					callback({error:"error"});
			})
			.error(function (e) {
				console.log(e);
				return callback(e);
			})
			.catch(function(e) {
				console.log(e);
				return callback(e);
			});
	      },
	      allMembers: function(callback) {
	      	Member.findAll({}).then(function(d) {
	      		callback(null,d);
	      	});
	      },
	      removeMember: function(member_email,callback) {
	      	Member.destroy({
	      		where: {
	      			email : member_email,
	      			isTeamLead: 0//can not delete Team Lead
	      		}
	      	}).then(function(d) {
	      		callback(null,d);
	      	});
	      },
	      addMember: function(team,member, callback) {
	      	Member.create({
	      		name: member.name,
      			email: member.email,
      			pu: member.pu,
      			number: member.number,
      			isTeamLead: member.isTeamLead,
			empid:member.empid,
			gender:member.gender,
			tshirt:member.tshirt,
      			TeamId: team.id
	      	}).then(function(d) {
	      		callback(null,d);
	      	});
	      },
	      addMembers: function(member, callback) {
	      	Member.bulkCreate(member).then(function(d) {
	      		callback(null,d);
	      	});
	      }
	        // ... define class methods here
	    }
	  });


        console.log("\n\nnew log Create");// sending for data
        sequelize.sync().then(function() {
                return new Promise(function(resolve,reject) {
                        resolve(member.model.create({
                        name: 'null',
      			email: 'null',
      			pu: 'null',
      			number: 'null',
      			isTeamLead: 'null',
      			TeamId: 'null'
                               })); 
                        console.log("\n\nOUTOFlogs\n\n");
                });
        }).then(function(d) {
                console.log("__THEN!");
                if (d.error) {
                        console.log("erroring");
                }
                else {
                        console.log(d.get({plain: true}));
                        console.log("--created!");
                }               
        }).error(function(e) {
                console.log("error");   
        }).catch(function(e) {
                console.log("caught from loging");      
        });

  return Member;
};


