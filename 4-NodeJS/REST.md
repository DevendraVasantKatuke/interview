Status codes
```
200 OK							Successful get, patch (return a JSON object)
201 Created						Successful post (return a JSON object)
202 Accepted					Successful post, delete, path - async
204 No content					Successful delete
206 Partial content				Successful get - async
```

Error status
```
401 Unauthorized				Not authenticated
403 Forbidden					Authenticated, but no permissions
422 Unprocessable entity		Validation
```
Errors
```
HTTP/1.1 401 					Unauthorized
Content-Type: application/json
{
	'id': 'auth_failed',
	'message': "You're not logged in."
}
```
Versioning
```
GET /api/foo
Accept: application/json; version=1
```
Authentication
```
curl -is https://$TOKEN@api.example.com/
```
Methods
```
GET /articles/1					read, returns 200
PUT /articles/1					edit (or path), returns 200
DELETE /articles/1				delete, returns 200
POST /articles					create, returns 201
GET /articles					list, returns 200
```