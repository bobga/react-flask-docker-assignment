class Config(object):
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://myuser:mypassword@postgres/sport_stats'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSONIFY_PRETTYPRINT_REGULAR = False