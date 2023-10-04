from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    recomended = BooleanField('recomended')
    review_text = StringField('review_text',validators=[DataRequired()])
