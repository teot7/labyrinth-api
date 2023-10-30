Tech stack: Node.js/Express.js, MongoDB

SETUP
· enter in the folder from the terminal and run "npm install"
· run "npm start"
· REST APIs can now be used. To test REST APIs I use Postman

The DB is a cloud free DB that I set up for this test (I didn't put any restrictions on the IPs)

Authentication occurs via Basic Auth, to set it simply go to the authorization tab, set basic auth
set username "admin" and password "password"
once authentication has been completed, the user is created within the collection
and a session with the user ID is saved. Any labyrinth created will be associated to that user ID.

The labyrinth is represented by a multiple array composed of 4 single arrays representing the rows
and each array is made up of 7 fields representing the columns, as in the example provided.
The array is represented like the following where 0 indicates an empty field, while 1 indicates the wall
The starting and ending points are defined in a own property in the labyrinth collection,
if these fields are defined the empty or filled at the same cell won't be considered

e.g.
[
[1, 0, 0, 1, 0, 0, 0],
[0, 1, 0, 0, 1, 0, 0],
[0, 0, 0, 0, 0, 1, 0],
[0, 1, 0, 1, 0, 0, 0],
]
