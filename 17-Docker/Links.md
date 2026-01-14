1. Docker Orchestration https://lab.abilian.com/Tech/Containers/Docker%20Orchestration/
2. Docker Swarm & Docker Stacks https://lab.abilian.com/Tech/Containers/Docker%20Swarm%20%26%20Docker%20Stacks/
3. Docker Swarm https://lab.abilian.com/Tech/Containers/Docker%20Swarm/
4. https://www.vervecopilot.com/interview-questions/why-is-a-dockerfile-cheat-sheet-your-secret-weapon-for-acing-any-technical-conversation
5. https://anjikeesari.com/developertools/cheatsheets/dockerfile-cheat-sheet/
6. https://anjikeesari.com/developertools/cheatsheets/docker-cheat-sheet/
7. https://medium.com/@oap.py/dockerfile-cheat-sheet-4ad12569aa0b
8. https://kapeli.com/cheat_sheets/Dockerfile.docset/Contents/Resources/Documents/index
9. https://jstobigdata.com/docker/advanced-docker-tutorial/
10. https://dockerlabs.collabnix.com/docker/cheatsheet/
11. https://supriyasurkar.hashnode.dev/day-20-task-docker-and-docker-compose-cheat-sheet
12. https://unfoldai.com/docker-cheat-sheet/
13. https://blog.programster.org/docker-compose-cheatsheet
14. https://centlinux.com/docker-compose-cheat-sheet/
15. https://sweworld.net/cheatsheets/docker_compose/
16. https://sweworld.net/cheatsheets/docker/
17. https://sweworld.net/cheatsheets/kubernetes/
18. https://tools.adminforge.de/docker-compose-converter?conv=v2xToV3x
19. https://kshitij-tripathi.medium.com/mastering-docker-and-docker-compose-your-ultimate-cheatsheet-58e7f008a4b2
20. https://dockerlabs.collabnix.com/docker/cheatsheet/
21. https://collabnix.com/docker-cheatsheet/
22. https://collabnix.com/docker-compose-cheatsheet/
23. https://dockerlabs.collabnix.com/
24. https://devopscycle.com/blog/the-ultimate-docker-cheat-sheet
25. https://github.com/wsargent/docker-cheat-sheet
26. https://spacelift.io/blog/docker-commands-cheat-sheet
27. https://www.geeksforgeeks.org/devops/docker-cheat-sheet/
28. https://www.coursera.org/collections/docker-cheat-sheet
29. https://devhints.io/docker
30. https://devhints.io/dockerfile
31. https://devhints.io/docker-compose
32. https://buddy.works/tutorials/docker-commands-cheat-sheet
33. https://john-cd.com/cheatsheets/
34. https://blog.rishabkumar.com/docker-cheat-sheet
35. https://devopscycle.com/blog/the-ultimate-docker-compose-cheat-sheet
36. https://devopscycle.com/blog
37. https://dockerlabs.collabnix.com/intermediate/docker-compose/compose-cheatsheet.html
38. https://www.jasonlws.com/posts/docker-compose-cheat-sheet/
39. https://devopscycle.com/blog/the-ultimate-docker-compose-cheat-sheet
40. https://helgeklein.com/blog/docker-compose-cheat-sheet/
41. https://viky.co.in/2017/12/13/docker-compose-notes/
42. https://sivabharathy.in/blog/docker-and-docker-compose-cheatsheet/


https://sweworld.net/cheatsheets/linux/
https://sweworld.net/cheatsheets/git/
https://sweworld.net/cheatsheets/mongodb/
https://www.jasonlws.com/posts/git-cheat-sheet/


Colors: https://www.jasonlws.com/posts/git-cheat-sheet/

Find a process by port
lsof -i :[port number]
Close a stubborn process
kill -9 $(pgrep -f [process name] -u $USER)
Upgrade postgres in docker
sudo docker stop appname-postgres
sudo docker rm appname-postgres

sudo docker run -d --cpus=".8" \
-p 0.0.0.0:5432:5432 \
--restart unle...