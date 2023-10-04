from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    burnout_review_1 = Review(
        recomended=False,
        game_id=1,
        user_id=3,
        review_text='Unrealistic premise. People can work more than 60 hours a week without issue. Refunded.'
    )
    burnout_review_2 = Review(
        recomended=True,
        game_id=1,
        user_id=1,
        review_text='This game really speaks to me. 10/10, would play again.'
    )
    africanus_review_1 = Review(
        recomended=True,
        game_id=2,
        user_id=1,
        review_text='Africa really does have a rich and fascinating history and this game does an incredible job of bringing it to life.'
    )
    africanus_review_2 = Review(
        recomended=True,
        game_id=2,
        user_id=2,
        review_text='The gameplay is solid, if not spectacular, but the setting itself really sets it apart from the other grand strategy games out there.'
    )
    db.session.add(burnout_review_1)
    db.session.add(burnout_review_2)
    db.session.add(africanus_review_1)
    db.session.add(africanus_review_2)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
