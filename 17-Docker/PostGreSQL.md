1.	docker pull postgres:15
2.	docker run --name postgres_test -e POSTGRES_PASSWORD=test -p 5433:5432 -d postgres