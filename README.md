1. System requrirment:

nodev4.2.6
mysql-server3.7

2. Installation guide:

Fork the project, enter into the dir and follow:

1. npm install (few modules if missing kindly install mannually)
2. forever start ./bin/www 
	or using nodemon 
	or simply node ./bin/www

	outcome: database will be created (if not manually : 'create database taskManagement'), tables will be auto created.-- serverStart screenshot

3. Three tabs can be seen - home, completedtasks, misc
4. Home: all task can be seen here
	1. task creation
	2. edit
	3. delete
	4. search with respect to task content, status , priority
5. Competed tasks;
	1.Only completed tasks can be seen here
6. Misc:
	Addon features which could be added on the system 
	My work as full-stack developer till now

