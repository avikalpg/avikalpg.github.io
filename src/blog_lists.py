# Script to create category wise list for blogs

import os
from bs4 import BeautifulSoup as bs
from parse_date_string import get_date_from_string

TAGS = ['tec', 'art', 'fit', 'ent', 'sdg']

TITLE_LABEL = "title"
TAGS_LABEL = "tags"
IMAGE_LABEL = "image"
DESCRIPTION_LABEL = "description"
DATE_LABEL = "date"

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
    all_articles = [f.name for f in os.scandir(articles_dir) if f.is_file()]

    # get meta information of all articles
    all_meta = dict()
    for article in all_articles:
        meta = getMetaInfo(articles_dir + article)
        all_meta[article] = meta

    # print(all_meta)

    # filter articles based on tags
    filter_articles = {k:[] for k in TAGS}
    sorted_articles = sorted(all_meta.items(), key=lambda all_meta_item: get_date_from_string(all_meta_item[1].get('date', '')), reverse=True)
    for article in [all_meta_item[0] for all_meta_item in sorted_articles]: # all_meta.keys(), but sorted
        for tag in all_meta[article][ TAGS_LABEL ]:
            filter_articles[tag].append( article )

    print("==")
    print(filter_articles)

    # create HTML files for each of the blog lists according to tags
    for tag in TAGS:
        htmlContent = "\n"
        for article in filter_articles[tag]:
            htmlContent += "<div class='article'>\n"
            htmlContent += "\t<h2><a href='" + articles_dir + article + "'>" + all_meta[article][ TITLE_LABEL ] + "</a></h2>\n"
            htmlContent += "\t<small>" + all_meta[article].get( DATE_LABEL, '' ) + "</small>\n"
            htmlContent += "\t<p>" + all_meta[article][ DESCRIPTION_LABEL ] + "</p>\n"
            htmlContent += "</div>\n"
        with open(lists_dir + tag + ".html", 'w+') as f:
            f.write(htmlContent)

    htmlContent = "\n"
    for article in all_articles:
        htmlContent += "<div class='article'>\n"
        htmlContent += "\t<h2><a href='" + articles_dir + article + "'>" + all_meta[article][ TITLE_LABEL ] + "</a></h2>\n"
        htmlContent += "\t<small>" + all_meta[article].get( DATE_LABEL, '' ) + "</small>\n"
        htmlContent += "\t<p>" + all_meta[article][ DESCRIPTION_LABEL ] + "</p>\n"
        htmlContent += "</div>\n"
    with open(lists_dir + "all.html", 'w+') as f:
        f.write(htmlContent)

if __name__ == '__main__':
    main()
