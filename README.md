## Description
This is a task-manager application to demonstrate the backend technologies, including NestJS, Typescript, TypeORM, and Postgres.

This is a backend application without frontend, which has been allowed by the lecturer. There are several things that you will need to install and download before test this application. Please follow the instruction. 
## Installation
#### 1. Install Node.js
If you have not used Node.js before. You can simply download Node.js from [here](https://nodejs.org/en). 

#### 2. Install Yarn
It is recommended to install Yarn through the npm package manager, which comes bundled with Node.js when you install it on your system.
```bash
npm install --global yarn
```
You can find out more on yarn official website and how to install it. [here](https://classic.yarnpkg.com/en/docs/install/#mac-stable).

Check that Yarn is installed by running:
```bash
yarn --version
```
#### 3. Install Docker
We are going to use Docker to run Postgres. It is easy, straight-forward and it works cross-platform. You will need to install Docker on your machine.

You can find detailed instructions on how to install Docker for your operating system in the official Docker download page [here](https://classic.yarnpkg.com/en/docs/install/#mac-stable). 

To check that Docker is installed, you can run:
```bash
Docker
```

#### 4. Install pgAdmin
pgAdmin is going to help us manage and observe our Postgres database. This tool is cross-platform. You can find detailed download instructions in the official pgAdmin download page. [here](https://www.pgadmin.org/download/)

#### 5. Install Postman
Postman is going to help us test our API. This tool is cross-platform. You can find detailed download instructions in the official Postman download page. [here](https://www.postman.com/downloads/)

## Configuration
#### 1. Docker

If you have Docker installed, run the following command:
```bash
docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```
In the command above, "run" means I want to run a container, "postgres-nest" is the name of the container, "-p" is the port mapping, "-e" is the environment variable,it set the POSTGRES_PASSWORD to postgres, "-d" is the detached mode, which means if you close the terminal, the container is going to keep running, and "postgres" is the actual container name.

#### 2. pgAdmin
a) Open your pdAdmin, when you firstly open it, you might need to set a password. Then you will see a "Severs" tag on your left hand menu, it is empty for now. Right click "Servers" and select "Register" -> "Server".


![](https://raw.githubusercontent.com/UOA-CS732-SE750-Students-2023/cs732-se75-assignment-yil909/main/assets/%E6%88%AA%E5%B1%8F2023-04-08%20%E4%B8%8A%E5%8D%8811.47.51.png)



b) Then you can give the server a name. For example: 

![](https://raw.githubusercontent.com/UOA-CS732-SE750-Students-2023/cs732-se75-assignment-yil909/main/assets/%E6%88%AA%E5%B1%8F2023-04-08%20%E4%B8%8A%E5%8D%8811.54.40.png)

c) After that, you can click the "Connection" button and do the following settings (The Password is the same as the one you set in the Docker command above, which should be "postgres"):


![Example image](https://raw.githubusercontent.com/UOA-CS732-SE750-Students-2023/cs732-se75-assignment-yil909/main/assets/%E6%88%AA%E5%B1%8F2023-04-08%20%E4%B8%8B%E5%8D%8812.30.12.png)

d) After that, you can click the "Save" button and you will see the server you just created in the "Servers" tag on your left hand menu.

## Testing
#### 1. Start the app
Assume that you have all the tools installed, configured and running. You can run the following commands to test the application:

```bash
yarn start:dev
```

If you see something like this in your terminal, that means the app is running successfully

![](https://raw.githubusercontent.com/UOA-CS732-SE750-Students-2023/cs732-se75-assignment-yil909/main/assets/%E6%88%AA%E5%B1%8F2023-04-08%20%E4%B8%8B%E5%8D%881.16.39.png)

#### 2. Test the app
a) To test the application, please open Postman and click "Collection" -> "Create a new collection". Then you can give the collection a name, for example: "Task Management". For example: 

![](https://github.com/UOA-CS732-SE750-Students-2023/cs732-se75-assignment-yil909/blob/main/assets/%E6%88%AA%E5%B1%8F2023-04-08%20%E4%B8%8B%E5%8D%881.39.18.png?raw=true)

b) To make a new request on Postman

![](https://raw.githubusercontent.com/UOA-CS732-SE750-Students-2023/cs732-se75-assignment-yil909/main/assets/%E6%88%AA%E5%B1%8F2023-04-08%20%E4%B8%8B%E5%8D%881.46.17.png)

c) The first functionality is to sign up and create a user. You can follow the steps to create a user:

![](https://github.com/UOA-CS732-SE750-Students-2023/cs732-se75-assignment-yil909/blob/main/assets/%E6%88%AA%E5%B1%8F2023-04-08%20%E4%B8%8B%E5%8D%881.53.59.png?raw=true)

**The username should be at least 4 characters long and a maximum 20 characters, and the password should be at least 8 characters long and a maximum 20 characters. In addition, the password need to contain at least one uppercase letter, one lowercase letter, and one digit or special character, and is at least 8 characters long.**
If the requirements are not met, it will return the error message "password too weak".

d) The second functionality is to sign in and get the token. You can follow the steps to get the token (Please save the token for the next steps):
![](https://github.com/UOA-CS732-SE750-Students-2023/cs732-se75-assignment-yil909/blob/main/assets/%E6%88%AA%E5%B1%8F2023-04-08%20%E4%B8%8B%E5%8D%882.21.06.png?raw=true)

e) The third functionality is to create a task. You can follow the steps to create a task (You will need the token from the previous step):
![](https://github.com/UOA-CS732-SE750-Students-2023/cs732-se75-assignment-yil909/blob/main/assets/%E6%88%AA%E5%B1%8F2023-04-08%20%E4%B8%8B%E5%8D%882.47.32.png?raw=true)
![](https://github.com/UOA-CS732-SE750-Students-2023/cs732-se75-assignment-yil909/blob/main/assets/%E6%88%AA%E5%B1%8F2023-04-08%20%E4%B8%8B%E5%8D%883.32.59.png?raw=true)
As you can see an ID is generated for the task, you will need to use this for the next test. 

f) The fourth functionality is to get task by ID.
![](./assets/截屏2023-04-08 下午3.46.58.png)

g) The fifth functionality is to get all tasks.
Similar step f, you will need to use the token to get all tasks. The result will be like this:
![](https://github.com/UOA-CS732-SE750-Students-2023/cs732-se75-assignment-yil909/blob/main/assets/%E6%88%AA%E5%B1%8F2023-04-08%20%E4%B8%8B%E5%8D%883.46.58.png?raw=true)

h) The sixth functionality is to delete a task by id.
![](https://github.com/UOA-CS732-SE750-Students-2023/cs732-se75-assignment-yil909/blob/main/assets/%E6%88%AA%E5%B1%8F2023-04-08%20%E4%B8%8B%E5%8D%884.03.38.png?raw=true)

i) The seventh functionality is to update a task by id. 
![](https://github.com/UOA-CS732-SE750-Students-2023/cs732-se75-assignment-yil909/blob/main/assets/%E6%88%AA%E5%B1%8F2023-04-08%20%E4%B8%8B%E5%8D%884.17.32.png?raw=true)
**There are three legal task statuses, which are OPEN, IN_PROGRESS, and DONE**

