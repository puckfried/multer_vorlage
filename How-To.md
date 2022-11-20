# Worauf achten?

## 1. Schritt Funktionalität in thunderclient

### usersController
- `res.cookie('token', token, cookieOptions)`

### auth
- `req.cookies` auslesen

### server.js
- `cookie-parser` installieren


## 2. Schritt Browser Entwicklungsumgebung
- Cookie kommt zurück im Browser
- dafür das er benuutzt werden kann, muss aber:
    - `server.js` cors() --> `credentials: true`
    - `Login.jsx` --> `credentials: 'include'`

- allerdings in Konsole können die Cookies ausgelesen werden:
    - `httpOnly: true`
- welchen Kontext können Cookies ausgelesen werden, `sameSite` Attribut:
    - `lax` (default) --> keine 3rd Parties, aber von abweichenden        Unterrouten
    - `strict` keine andren Routen
    - `none` --> auch third Parties (benötigt `secure true`)
- https only --> `secure` Eigenschaft (geht jetzt bei localhost inn firefox und später bei Chrome)



## 3. Schritt anpassen Frontend
- keine automatische Weiterleitung, daher fetch beim Laden der Seite, User laden...
- 

## 4. Logout schreiben
- fetch gegen route logout
- dort cookie zerstören
- frontend state nullen
