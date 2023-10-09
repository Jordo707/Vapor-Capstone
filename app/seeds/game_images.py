from app.models import db, Game_Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_game_images():
    burnout = Game_Image(
        image='https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F220308184203-burnout-stock.jpg',
        preview=True,
        game_id=1
    )
    africanus = Game_Image(
        image='https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/earth-from-space-africa-view-johan-swanepoel.jpg',
        preview=True,
        game_id=2
    )
    space_field = Game_Image(
        image='https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-4_1562-749.jpg',
        preview=True,
        game_id=3
    )
    db.session.add(burnout)
    db.session.add(africanus)
    db.session.add(space_field)
    db.session.commit()

def undo_game_images():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM games"))

    db.session.commit()
