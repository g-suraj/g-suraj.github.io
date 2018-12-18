#!/usr/bin/env python3
import os
import sys
import json
import datetime

path = "./raw"
reviews = json.load(open('reviews.json', 'r'))
init = len(reviews)

# Obtain raw files
for root, dirs, files in os.walk(path):
    target_files = [str(path + "/" + filename) for filename in files if filename[0] != "."]

for filename in target_files:
    review = open(filename, 'r').read().split("\n")
    key = review[0]
    if(key in reviews):
        break
    reviews[key] = review

if len(reviews) == init:
    print("No new reviews added. Exiting")
    sys.exit(0)

# Reverse sort by date

sorted_reviews = sorted(reviews, key=lambda x: datetime.datetime.strptime(reviews[x][4], '%Y-%m-%d'), reverse = True)
reviews = dict((key, reviews[key]) for key in sorted_reviews)


# Write back
json.dump(reviews, open('reviews.json', 'w'), indent=4, separators=(',', ': '))
print("{} reviews added!".format(len(reviews)))
