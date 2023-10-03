from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo',last_name='User',email='demo@aa.io',username='Demo_User',password='password',profile_pic='https://banner2.cleanpng.com/20180319/xrq/kisspng-computer-icons-user-profile-clip-art-person-icon-user-person-man-icon-5ab04a2bed2dd1.5439408315215027639715.jpg')
    cod = User(
        first_name='Cod',last_name='Toward',email='todd@aa.io',username='Badthesda',password='password',profile_pic='https://banner2.cleanpng.com/20180319/xrq/kisspng-computer-icons-user-profile-clip-art-person-icon-user-person-man-icon-5ab04a2bed2dd1.5439408315215027639715.jpg')
    martin = User(
        first_name='Martin',last_name='Anward',email='martin@aa.io',username='Conundrum',password='password',profile_pic='https://banner2.cleanpng.com/20180319/xrq/kisspng-computer-icons-user-profile-clip-art-person-icon-user-person-man-icon-5ab04a2bed2dd1.5439408315215027639715.jpg')

    db.session.add(demo)
    db.session.add(cod)
    db.session.add(martin)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
