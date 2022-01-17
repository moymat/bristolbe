IS PARENT, 0N BRISTOL, 01 BRISTOL
BRISTOL: title, content, position, created_at
POSITIONED IN ROOT, 1N BRISTOL, 0N USER: position

:
HAS ROLE, 1N BRISTOL, 0N USER: type
USER: first_name, last_name, email, picture_url, verified

:
PASSWORD: hash
IS PROTECTED BY, 11 USER, 11 PASSWORD
