Group Countdown Timer
=================

A countdown timer that is synced through socket.io. 

The client runs it's own timer after getting an initial time from the server, so it will keep working if the connection goes out.

Each client can send a new timer (currently 2, 5 and 10 minutes) which restarts the timer for all clients.

![group timer](/groupTimer.png)
