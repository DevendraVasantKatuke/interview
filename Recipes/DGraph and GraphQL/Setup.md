git config --global core.autocrlf false

// run this file on CMD
docker run -d --name dgraph-play -v dgraph-data:/dgraph -p 8080:8080 -p 9080:9080 dgraph/standalone:latest

// run this file on Docker Container Exec
curl -LO https://github.com/dgraph-io/dgraph-benchmarks/raw/refs/heads/main/data/1million.rdf.gz
curl -LO https://raw.githubusercontent.com/dgraph-io/dgraph-benchmarks/refs/heads/main/data/1million.schema

// run this file on CMD
docker exec -it dgraph-play dgraph live -f 1million.rdf.gz -s 1million.schema

// run this file on CMD
docker run --rm -it -p 8000:8000 dgraph/ratel:latest