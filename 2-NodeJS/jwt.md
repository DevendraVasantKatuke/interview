```
// header
{
	"alg": "HS512",
	"typ": "JWT"
}
// payload
{
	"sub": "0987654321",
	"name": "Devendra Vasant Katuke",
	admin: true
}

hmacsha512(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)

 const bearerHeader = req.headers["authorization"]
```