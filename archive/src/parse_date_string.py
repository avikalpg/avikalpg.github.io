import re
from datetime import datetime

# parses date strings in the format "14th August 2022"
def get_date_from_string(date_string):
    try:
        date_string = re.sub(r'(\d)(st|nd|rd|th)', r'\1', date_string)
        date_object = datetime.strptime(date_string, '%d %B %Y')
        return date_object
    except:
        print("ERROR: [get_date_from_string] could not parse date string")
        return datetime(1970, 1, 1)

