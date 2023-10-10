from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired
from app.api.aws_uploads import ALLOWED_EXTENSIONS

class GameForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    # preview_image = StringField('preview_image', validators=[DataRequired()])
    preview_image = FileField('preview_image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
