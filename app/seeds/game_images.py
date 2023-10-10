from app.models import db, Game_Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_game_images():
    burnout = Game_Image(
        image='https://cdn.discordapp.com/attachments/1160966711093231666/1161092667116097586/image.png?ex=65370acf&is=652495cf&hm=5e5fb1d2d9819aa3ec83c6a3ea6e3ca7927d68bc2cbf6868557e0c3aba58dc28&',
        preview=True,
        game_id=1
    )
    b1 = Game_Image(
        image='https://cdn.discordapp.com/attachments/1160966711093231666/1161093489447149568/image.png?ex=65370b93&is=65249693&hm=96b2c8b080bffe3ea38972a3cc80d75e0e57a2e9cbe5d13fa34cf3e571cbb09f&',
        preview=False,
        game_id=1
    )
    b2 = Game_Image(
        image='https://cdn.discordapp.com/attachments/1160966711093231666/1161090741259489300/image.png?ex=65370904&is=65249404&hm=437a78e0264f0998b506052d8ccebaa5479e25e0ea11226e1513781d9198463c&',
        preview=False,
        game_id=1
    )
    b3 = Game_Image(
        image='https://cdn.discordapp.com/attachments/1160966711093231666/1161092234876305480/image.png?ex=65370a68&is=65249568&hm=547ac97b46135e0edbea4b421f8b79c24e508ecdced3520df8b7f86fc1064da1&',
        preview=False,
        game_id=1
    )
    africanus = Game_Image(
        image='https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/earth-from-space-africa-view-johan-swanepoel.jpg',
        preview=True,
        game_id=2
    )
    a1 = Game_Image(
        image='https://cdn.discordapp.com/attachments/1160966711093231666/1161094447010959389/image.png?ex=65370c78&is=65249778&hm=d573dba6e8e49a237871c8f0159dbf55bff58fa0d1ebe7d281b0a8cdcf99d9ad&',
        preview=False,
        game_id=2
    )
    a2 = Game_Image(
        image='https://cdn.discordapp.com/attachments/1160966711093231666/1161096144412217476/image.png?ex=65370e0c&is=6524990c&hm=725bb54e243e7d33b703f88acdeb3f43db10ee79549aa4137f485a5315ba2c57&',
        preview=False,
        game_id=2
    )
    a3 = Game_Image(
        image='https://cdn.discordapp.com/attachments/1160966711093231666/1161096847234961599/image.png?ex=65370eb4&is=652499b4&hm=b5c86387643e1b306b9d09894adb7f523374e4991420e2e177d143e8df5eee0d&',
        preview=False,
        game_id=2
    )
    space_field = Game_Image(
        image='https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-4_1562-749.jpg',
        preview=True,
        game_id=3
    )
    sf1 = Game_Image(
        image='https://t3.ftcdn.net/jpg/05/58/61/32/360_F_558613274_Z1zbjnHZKjpnTvvsjfZzYXk2TIeUl54a.jpg',
        preview=False,
        game_id=3
    )
    sf2 = Game_Image(
        image='https://e0.pxfuel.com/wallpapers/208/992/desktop-wallpaper-floating-in-space-by-visualdon-live-2d-space.jpg',
        preview=False,
        game_id=3
    )
    sf3 = Game_Image(
        image='https://hdwallpaperim.com/wp-content/uploads/2017/08/22/433385-astronaut-ultra-wide-space-space_art-science_fiction-748x316.jpg',
        preview=False,
        game_id=3
    )
    db.session.add(burnout)
    db.session.add(b1)
    db.session.add(b2)
    db.session.add(b3)
    db.session.add(africanus)
    db.session.add(a1)
    db.session.add(a2)
    db.session.add(a3)
    db.session.add(space_field)
    db.session.add(sf1)
    db.session.add(sf2)
    db.session.add(sf3)
    db.session.commit()

def undo_game_images():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM games"))

    db.session.commit()
