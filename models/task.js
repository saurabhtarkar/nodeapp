var Sequelize = require('sequelize');


module.exports = function(sequelize) {
	console.log("Tasks.js in");
	var Task = sequelize.define('Task', {
		rule_name:{type: Sequelize.STRING, allownull:false},
		message_content:{type: Sequelize.STRING, allownull:false},
	    	status:Sequelize.STRING,
	    	priority:Sequelize.STRING,
		trigger_date: Sequelize.STRING,
		tag: Sequelize.STRING
	},{
	    classMethods: {
	      associate: function(models) {
	      },
	      createTask: function(team,callback){
	      	Task.create({
  			 rule_name : team.rule_name ,
    			phone : team.phone ,
    			message_content: team.message_content,
    			no_message: team.no_message,
    			trigger_date: team.trigger_date
 			}).then(function(team) {
  				callback(null,team);
  			});
	      },
	      
	      checkReset: function(team, callback) {
	      	Task.findOne({
	      		where:{
	      			resetPasswordToken: team.resetPasswordToken,
	      			resetPasswordExpires: {
	      				$gt:team.resetPasswordExpires
	      			}
	      		}
	      	}).then(function(d) {
	      		console.log(d);
	      		if(d!=null)
	      			callback(null,d);
	      		else
	      			callback({'message':'Not Found'});
	      	});
	      },
	      updatePassword: function(team, callback) {
	      	Task.update({
	      		password: team.password,
	      		resetPasswordToken: '',
	      		resetPasswordExpires: ''
	      	},
	      	{
	      		where: {
	      			name: team.name
	      		}
	      	}).then(function(d) {
	      		console.log(d);
	      		callback(null,d);

	      	});
	      },
	      createResetTokens: function(team, callback) {
	      	Task.update({
	      		resetPasswordToken: team.resetPasswordToken,
	      		resetPasswordExpires: team.resetPasswordExpires
	      	},
	      	{
	      		where: {
	      			name: team.name
	      		}
	      	}).then(function(d) {
	      		console.log(d);
	      		callback(null,d);

	      	});
	      },
	      updateURL: function(teamname, newurl, callback) {
	      	Task.update({
	      		projectname: newurl
	      	},
	      	{
	      		where: {
	      			name: teamname
	      		}
	      	}).then(function(d) {
	      		console.log(d);
	      		callback(null,d);

	      	});
	      },
	    /* updateURL: function(teamname, newurl, callback) {
	      	Task.update({
	      		svnURL: newurl
	      	},
	      	{
	      		where: {
	      			name: teamname
	      		}
	      	}).then(function(d) {
	      		console.log(d);
	      		callback(null,d);

	      	});
	      },
				*/
	      findOned: function (team,callback) {
	      	console.log("INSIDE findOned");

	      	Task.findOne({
	      		attribute:['name','password','id','svnURL','projectname','resettoken','resetexpiresin'],
	      		where:{name:team.name}
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
	       findTaskId: function (team,callback) {
	      	console.log("INSIDE findTaskId");

	      	Task.findOne({
	      		attribute:['id'],
	      		where:{name:team.name}
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
	      allTasks: function(callback) {
	      	Task.findAll({}).then(function(d) {
	      		callback(null,d);
	      	});
	      },
	      
	      //
	    }
	});
	/*sequelize.sync().then(function() {
                return new Promise(function(resolve,reject) {
                        resolve(Task.create({
      			verified:0 
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
        });*/

  return Task;
};
