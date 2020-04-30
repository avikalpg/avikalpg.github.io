# Script to create category wise list for blogs

import os
from bs4 import BeautifulSoup as bs

TAGS = ['tec', 'art', 'fit', 'ent', 'sdg']
TAGS_LABEL = "tags"

articles_dir = "../blog/articles/"
lists_dir = "../blog/list_pages/"

def getMetaInfo(fileName):
	with open(fileName, 'rb') as f:
		htmlContent = f.read()
	
	soup = bs(htmlContent, 'html.parser')
	meta_tags = soup.find_all('meta')
	info = dict()

	for meta_tag in meta_tags:
		info[meta_tag.get('name')] = meta_tag.get('content')
		if meta_tag.get('name') == TAGS_LABEL:
			info[meta_tag.get('name')] = [tag.strip() for tag in meta_tag.get('content').split(",")]

	return info

def main():
	all_articles = os.listdir(articles_dir)

	# get meta information of all articles
	all_meta = dict()
	for article in all_articles:
		meta = getMetaInfo("../blog/articles/" + article)
		all_meta[article] = meta

	# print(all_meta)

	# filter articles based on tags
	filter_articles = {k:[] for k in TAGS}
	for article in all_meta.keys():
		for tag in all_meta[article][ TAGS_LABEL ]:
			filter_articles[tag].append( article )

	print("==")
	print(filter_articles)

	# create HTML files for each of the blog lists according to tags

if __name__ == '__main__':
	main()