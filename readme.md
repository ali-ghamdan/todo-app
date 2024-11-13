# NestJS Todo APP
just use git clone and `npm run start:dev`
note: you must have mongodb, no jest or swagger for now.
## endpoints:

### auth
1. `POST /auth/register` 
body:
```json
{
  "email": "XXX@YYY.xzy",
  "password": "1234526789",
  "username": "myname"
}
```

2. `POST /auth/login`
body:
```json
{
  "email": "XXX@YYY.xzy",
  "password": "1234526789"
}
```
response:
```json
{
  "access_token": "JWT_ACCESS_TOKEN"
}
```
(must use this header when needed: authorization: JWT_ACCESS_TOKEN) </br>
3. `GET /auth/profile` (need authorization) </br>

### tasks
all tasks endpoints need an authorization: </br>

1. `POST /tasks`
create a task for a user </br>
body:
```json
{
  "title": "",
  "description": "",
  "status": 0
}
```

#### status:
Pending = 0 </br>
SUCCESS = 1 </br>
CANCELED = 2 </br>
IN_PROGRESS = 3 </br>

2. `GET /tasks`, list tasks </br>
Query:
```json
"?page=2&include_deleted=true"
```

3. `GET /tasks/:id` get task id
4. `PUT /tasks/:id` edit tasks status:
```jsonc
// one or more is required
{
  "title": "",
  "description": "",
  "status": 2,
  "isDeleted": true
}
```
5. `Delete /tasks/:id` delete a task, short for `PUT /tasks/:id` with isDeleted: true.
